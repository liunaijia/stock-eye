import { readAsText } from './responseHelper';
import { YESTERDAY_RATIO_FACTOR } from './settings';
import { lastTradeDay } from './time';

// const cachedYesterdayData = {};
const cachedYesterdayData = {
  // date: '20170925',
  // sh601398: 2.17,
  // sh601988: 0.95,
  // sh601288: 1.58,
  // sh601939: 1.29,
  // sh601328: 0.79,
};

const fetchYesterdayData = async (stockCodes) => {
  const day = lastTradeDay().toISOString().substring(0, 10).replace(/-/g, '');

  if (cachedYesterdayData.date === day) {
    return cachedYesterdayData;
  }

  const paramCode = stockCodes.map(code => `cn_${code.substring(2)}`).join(',');
  // http://q.stock.sohu.com/hisHq?code=cn_601988,cn_601288&start=20170921&end=20170921&r=asdf
  const response = await fetch(`http://q.stock.sohu.com/hisHq?code=${paramCode}&start=${day}&end=${day}&r=${new Date().getTime()}`);
  const text = readAsText(response);
  const data = JSON.parse(text).map((stockData) => {
    const stockCodeWithoutPrefix = stockData.code.substring(3);
    const fullStockCode = stockCodes.find(code => code.includes(stockCodeWithoutPrefix));
    // hq is an array which has values: [日期, 开盘价, 收盘价, 涨跌额, 涨跌幅, 最低价, 最高价, 成交量, 未知, 换手率]
    const ratio = parseFloat(stockData.hq[0][4].replace('%', ''));
    return [fullStockCode, ratio];
  });

  // eslint-disable-next-line no-restricted-syntax
  for (const [stockCode, ratio] of data) {
    cachedYesterdayData[stockCode] = ratio;
  }
  cachedYesterdayData.date = day;
  return cachedYesterdayData;
};

const fetchData = async (stockCodes = []) => {
  const response = await fetch(`http://hq.sinajs.cn/rn=${new Date().getTime()}&list=${stockCodes.join(',')}`);
  const text = readAsText(response);
  return text;
};

const getValueFrom = (array = [], index = 0) => parseFloat(array[index]);

const getValuesFrom = (array = [], index = 0, length = 1) =>
  Array.from({
    length,
  }, (_, i) => getValueFrom(array, index + i));

const collapseArray = (array = []) =>
  array.reduce((acc, _, idx) => {
    if (idx % 2 === 0) {
      acc.push({
        price: array[idx + 1],
        amount: array[idx],
      });
    }
    return acc;
  }, []);

const calcRatio = ((price, stock) => Math.round(((price / stock.closeAt) - 1) * 10000) / 100);

const parse = (text = '') =>
  text
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
      stock.ratio = calcRatio(stock.current, stock);
      stock.buyingRatio = calcRatio(stock.buyingAt, stock);
      stock.sellingRatio = calcRatio(stock.sellingAt, stock);
      return stock;
    });

const fetchStocks = async (stockCodes = []) => {
  const text = await fetchData(stockCodes);
  const stocks = parse(text);

  if (YESTERDAY_RATIO_FACTOR !== 0) {
    const yesterdayData = await fetchYesterdayData(stockCodes);
    stocks.forEach((stock) => {
      const yesterdayRatio = YESTERDAY_RATIO_FACTOR * yesterdayData[stock.code];
      stock.buyingRatio += yesterdayRatio; // eslint-disable-line no-param-reassign
      stock.sellingRatio += yesterdayRatio; // eslint-disable-line no-param-reassign
    });
  }

  return stocks;
};

export { fetchStocks };
