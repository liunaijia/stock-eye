import { lastTradeDay } from './time';
import { getBuyGap, getSellGap } from './gapService';
import { fetchHistoryQuotes, fetchCurrentQuotes } from './apis';

// const cachedHistoryData = {};
const cachedHistoryData = {
  // '20170925': {
  //   sh601398: 2.17,
  //   sh601988: 0.95,
  //   sh601288: 1.58,
  //   sh601939: 1.29,
  //   sh601328: 0.79,
  // },
};

const fetchHistoryCloseAt = async (stockCodes, daysBefore) => {
  let tradeDay = new Date();
  Array.from({ length: daysBefore }).forEach(() => {
    tradeDay = lastTradeDay(tradeDay);
  });

  const day = tradeDay.toISOString().substring(0, 10).replace(/-/g, '');

  const missedStockCodes = cachedHistoryData[day]
    ? stockCodes.filter(code => !(code in cachedHistoryData[day]))
    : stockCodes;
  if (missedStockCodes.length === 0) {
    return cachedHistoryData[day];
  }

  const data = await fetchHistoryQuotes(missedStockCodes, tradeDay);

  const newData = data.reduce((acc, { stockCode, ...stockData }) => {
    acc[stockCode] = stockData.closeAt;
    return acc;
  }, {});
  cachedHistoryData[day] = { ...(cachedHistoryData[day] || {}), ...newData };
  // eslint-disable-next-line no-restricted-syntax
  // console.log(cachedHistoryData);
  return cachedHistoryData[day];
};

const calcRatio = (currentPrice, previousPrice) => Math.round(((currentPrice / previousPrice) - 1) * 10000) / 100;

const fetchStocks = async (stockCodes = [], lookBackDays = 1) => {
  if (stockCodes.length === 0) {
    return [];
  }

  const stocks = await fetchCurrentQuotes(stockCodes);

  const historyCloseAtData = await fetchHistoryCloseAt(stockCodes, lookBackDays);
  // console.log('my - historyCloseAtData', historyCloseAtData);
  stocks.forEach((stock) => {
    // 用基价计算买一价和卖一价的涨跌幅，默认基价为昨收价
    const baseAt = historyCloseAtData[stock.stockCode];
    Object.assign(stock, {
      baseAt,
      currentRatio: calcRatio(stock.current, stock.closeAt),
      baseRatio: calcRatio(stock.current, baseAt),
      buyingRatio: calcRatio(stock.buyingAt, baseAt),
      sellingRatio: calcRatio(stock.sellingAt, baseAt),
    });
  });

  stocks.forEach(stock => Object.assign(stock, {
    buyGap: getBuyGap(stocks, stock), // eslint-disable-line no-param-reassign
    sellGap: getSellGap(stocks, stock), // eslint-disable-line no-param-reassign
  }));

  // console.log('my - stocks', stocks);
  return stocks;
};

export { fetchStocks };
