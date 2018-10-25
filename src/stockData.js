import { readAsText } from './responseHelper';
import { lastTradeDay } from './time';
import { getBuyGap, getSellGap } from './gapService';

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

  const paramCode = missedStockCodes.map(code => `cn_${code.substring(2)}`).join(',');
  // http://q.stock.sohu.com/hisHq?code=cn_601988,cn_601288&start=20170921&end=20170921&r=asdf
  const response = await fetch(`/hisHq?code=${paramCode}&start=${day}&end=${day}&r=${new Date().getTime()}`);
  const text = await readAsText(response);
  const data = JSON.parse(text).map((stockData) => {
    const stockCodeWithoutPrefix = stockData.code.substring(3);
    const fullStockCode = stockCodes.find(code => code.includes(stockCodeWithoutPrefix));
    // hq is an array which has values: [日期, 开盘价, 收盘价, 涨跌额, 涨跌幅, 最低价, 最高价, 成交量, 未知, 换手率]
    const ratio = parseFloat(stockData.hq[0][2]);
    return [fullStockCode, ratio];
  });

  const newData = data.reduce((acc, [stockCode, ratio]) => {
    acc[stockCode] = ratio;
    return acc;
  }, {});
  cachedHistoryData[day] = { ...(cachedHistoryData[day] || {}), ...newData };
  // eslint-disable-next-line no-restricted-syntax
  // console.log(cachedHistoryData);
  return cachedHistoryData[day];
};

const fetchData = async (stockCodes = []) => {
  const response = await fetch(`/sinajs/rn=${new Date().getTime()}&list=${stockCodes.join(',')}`);
  const text = readAsText(response);
  return text;
};

const getValueFrom = (array = [], index = 0) => parseFloat(array[index]);

const getValuesFrom = (array = [], index = 0, length = 1) => Array.from({
  length,
}, (_, i) => getValueFrom(array, index + i));

const collapseArray = (array = []) => array.reduce((acc, _, idx) => {
  if (idx % 2 === 0) {
    acc.push({
      price: array[idx + 1],
      amount: array[idx],
    });
  }
  return acc;
}, []);

const calcRatio = (currentPrice, previousPrice) => Math.round(((currentPrice / previousPrice) - 1) * 10000) / 100;

const parse = (text = '') => text
  .split(';')
  .slice(0, -1)
  .map((line) => {
    const [, variable = '', valueExp = ''] = /(.*?)="(.*?)"/.exec(line);
    return [variable.substr(variable.lastIndexOf('_') + 1), valueExp.split(',')];
  })
  .map((item) => {
    const [stockCode, rawValues] = item;
    const stock = {
      code: stockCode,
      name: rawValues[0],
      openAt: getValueFrom(rawValues, 1),
      closeAt: getValueFrom(rawValues, 2),
      current: getValueFrom(rawValues, 3),
      buyingAt: getValueFrom(rawValues, 6),
      sellingAt: getValueFrom(rawValues, 7),
      buyingBids: collapseArray(getValuesFrom(rawValues, 10, 10)),
      sellingBids: collapseArray(getValuesFrom(rawValues, 20, 10)),
      timestamp: new Date(`${rawValues[30]} ${rawValues[31]}`),
    };
    return stock;
  });

const fetchStocks = async (stockCodes = [], lookbackDays = 1) => {
  const text = await fetchData(stockCodes);
  const stocks = parse(text);

  const historyCloseAtData = await fetchHistoryCloseAt(stockCodes, lookbackDays);
  // console.log('my - historyCloseAtData', historyCloseAtData);
  stocks.forEach((stock) => {
    // 用基价计算买一价和卖一价的涨跌幅，默认基价为昨收价
    const baseAt = historyCloseAtData[stock.code];
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
