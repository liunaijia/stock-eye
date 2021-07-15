import { useState, useEffect, useCallback } from 'react';
import { keyBy } from './util';
import { fetchCurrentQuotes } from '../apis';
import { runDuringTradeTime } from './schedule';
import { getBuyGap, getSellGap } from './gapService';

function calcRatio(currentPrice, previousPrice) {
  return Math.round(((currentPrice / previousPrice) - 1) * 10000) / 100;
}

async function getQuotesInGroup(group = {
  stocks: ['sz000001'],
  DEFAULT: true,
}) {
  if (group.DEFAULT) {
    return undefined;
  }
  const currentQuotes = keyBy(await fetchCurrentQuotes(group.stocks), 'stockCode');
  const groupQuotes = await Promise.all(
    group.stocks.map(async (stockCode) => {
      // const historyQuote = await fetchHistoryQuote(stockCode, day);
      const currentQuote = currentQuotes[stockCode];
      const currentRatio = calcRatio(currentQuote.current, currentQuote.closeAt);
      const baseAt = currentQuote.closeAt;
      const baseRatio = calcRatio(currentQuote.current, baseAt);
      // 用基价计算买一价和卖一价的涨跌幅，默认基价为昨收价
      const buyingRatio = calcRatio(currentQuote.buyingAt, baseAt);
      const sellingRatio = calcRatio(currentQuote.sellingAt, baseAt);

      return {
        ...currentQuote,
        currentRatio,
        baseAt,
        baseRatio,
        buyingRatio,
        sellingRatio,
      };
    }),
  );

  // calculate gaps
  groupQuotes.forEach((quote) => {
    Object.assign(quote, {
      buyGap: getBuyGap(groupQuotes, quote),
      sellGap: getSellGap(groupQuotes, quote),
    });
  });

  return groupQuotes;
}

export default (stockGroups = {}) => {
  const [quotes, setQuotes] = useState();

  const fetch = useCallback(async () => {
    const allData = await Promise.all(
      Object.entries(stockGroups)
        .map(async ([groupName, group]) => {
          const groupQuotes = await getQuotesInGroup(group);
          return { groupName, groupQuotes };
        }),
    );

    setQuotes(allData);
  }, [stockGroups]);

  useEffect(() => runDuringTradeTime({ interval: 3, runOnStartUp: true })(fetch), [fetch, stockGroups]);

  return quotes;
};
