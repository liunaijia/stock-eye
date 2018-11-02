import { createSelector } from 'reselect';
import { memoize } from 'lodash-es';
import {
  getBuyGap, getSellGap, calcBuyingGap, calcSellingGap,
} from '../gapService';
import store from '../store';

function calcRatio(currentPrice, previousPrice) {
  return Math.round(((currentPrice / previousPrice) - 1) * 10000) / 100;
}

const getHistoryQuotesSelector = createSelector(
  store.select.historyQuotes.getBy,
  getBy => memoize(
    (stockCode, lookBackDays) => getBy({ stockCode, lookBackDays }),
  ),
);

const getCurrentQuotesSelector = createSelector(
  store.select.currentQuotes.getByStockCode,
  getByStockCode => memoize(
    stockCode => getByStockCode(stockCode),
  ),
);

const getQuotesInGroupSelector = createSelector(
  getCurrentQuotesSelector,
  getHistoryQuotesSelector,
  (getCurrentQuotes, getHistoryQuotes) => memoize(
    group => group.stocks.reduce((result, stockCode) => {
      const stock = getCurrentQuotes(stockCode);
      if (stock) {
        stock.currentRatio = calcRatio(stock.current, stock.closeAt);
        const historyQuote = getHistoryQuotes(stock.stockCode, group.lookBackDays);
        if (historyQuote) {
          stock.baseAt = historyQuote.closeAt;
          stock.baseRatio = calcRatio(stock.current, stock.baseAt);
          // 用基价计算买一价和卖一价的涨跌幅，默认基价为昨收价
          stock.buyingRatio = calcRatio(stock.buyingAt, stock.baseAt);
          stock.sellingRatio = calcRatio(stock.sellingAt, stock.baseAt);
        }
        result.push(stock);
      }

      return result;
    }, []),
  ),
);

export const getGroupedQuotes = createSelector(
  store.select.groups.self,
  getQuotesInGroupSelector,
  (groups, getQuotesInGroup) => Object.entries(groups).reduce(
    (result, [groupName, group]) => {
      const quotes = getQuotesInGroup(group);
      // calculate gaps
      quotes.forEach(quote => Object.assign(quote, {
        buyGap: getBuyGap(quotes, quote),
        sellGap: getSellGap(quotes, quote),
      }));
      return Object.assign(result, { [groupName]: quotes });
    },
    {},
  ),
);

export const getAllQuotes = createSelector(
  getGroupedQuotes,
  groupedQuotes => Object.values(groupedQuotes).reduce(
    (result, quotesInGroup) => result.concat(quotesInGroup),
    [],
  ),
);

export const getSuggestions = createSelector(
  store.select.groups.self,
  getGroupedQuotes,
  (groups, groupedQuotes) => Object.entries(groupedQuotes).reduce(
    (result, [groupName, quotesInGroup]) => {
      if (quotesInGroup.length) {
        const suggestion = {
          groupName,
          buyingGap: calcBuyingGap(quotesInGroup),
          sellingGap: calcSellingGap(quotesInGroup),
          threshold: groups[groupName].threshold,
        };
        result.push(suggestion);
      }
      return result;
    },
    [],
  ),
);
