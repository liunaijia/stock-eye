import { useState, useEffect } from 'react';
import { keyBy } from 'lodash-es';
import { fetchCurrentQuotes, fetchHistoryQuote } from './apis';
import { lastTradeDay } from './time';
import { runDuringTradeTime } from './jobs/job';

function calcRatio(currentPrice, previousPrice) {
  return Math.round(((currentPrice / previousPrice) - 1) * 10000) / 100;
}

function getLastTradeDay(daysBefore) {
  let tradeDay = new Date();
  Array.from({ length: daysBefore }).forEach(() => {
    tradeDay = lastTradeDay(tradeDay);
  });
  return tradeDay;
}

async function getQuotesInGroup(group = {
  stocks: ['sz000001'],
  lookBackDays: 1,
  DEFAULT: true,
}) {
  if (group.DEFAULT) {
    return undefined;
  }
  const currentQuotes = keyBy(await fetchCurrentQuotes(group.stocks), 'stockCode');
  const day = getLastTradeDay(group.lookBackDays);
  const groupQuotes = await Promise.all(
    group.stocks.map(async (stockCode) => {
      const historyQuote = await fetchHistoryQuote(stockCode, day);
      const currentQuote = currentQuotes[stockCode];
      const currentRatio = calcRatio(currentQuote.current, currentQuote.closeAt);
      const baseAt = historyQuote.closeAt;
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
  return groupQuotes;
}

export default (stockGroups = {}) => {
  const [quotes, setQuotes] = useState();

  async function fetch() {
    const allData = await Promise.all(
      Object.entries(stockGroups)
        .map(async ([groupName, group]) => {
          const groupQuotes = await getQuotesInGroup(group);
          return { groupName, groupQuotes };
        }),
    );

    setQuotes(allData);
  }

  useEffect(() => runDuringTradeTime({ interval: 3, runOnStartUp: true })(fetch), [stockGroups]);

  return quotes;
};
