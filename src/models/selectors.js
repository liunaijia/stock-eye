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
    (stockCode, lookBackDays) => getBy(stockCode, lookBackDays),
  ),
);

const getCurrentQuotesSelector = createSelector(
  store.select.currentQuotes.getBy,
  getBy => memoize(
    (stockCode) => {
      console.log(stockCode);
      return getBy(stockCode);
    },
  ),
);

const getQuotesInGroupSelector = createSelector(
  getCurrentQuotesSelector,
  getHistoryQuotesSelector,
  (getCurrentQuotes, getHistoryQuotes) => memoize(
    group => group.stocks.reduce((result, stockCode) => {
      const stock = getCurrentQuotes(stockCode);
      // don't modify stock object as doing so changes data in store
      if (stock) {
        const historyQuote = getHistoryQuotes(stock.stockCode, group.lookBackDays);
        if (historyQuote) {
          const currentRatio = calcRatio(stock.current, stock.closeAt);
          const baseAt = historyQuote.closeAt;
          const baseRatio = calcRatio(stock.current, baseAt);
          // 用基价计算买一价和卖一价的涨跌幅，默认基价为昨收价
          const buyingRatio = calcRatio(stock.buyingAt, baseAt);
          const sellingRatio = calcRatio(stock.sellingAt, baseAt);

          result.push({
            ...stock,
            currentRatio,
            baseAt,
            baseRatio,
            buyingRatio,
            sellingRatio,
          });
        }
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
      const quotesWithGaps = quotes.map(quote => ({
        ...quote,
        buyGap: getBuyGap(quotes, quote),
        sellGap: getSellGap(quotes, quote),
      }));
      return { ...result, [groupName]: quotesWithGaps };
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
