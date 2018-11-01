import { readAsText } from '../responseHelper';

/**
 * return [{stockCode: 'sh601988', openAt: 3.57, closeAt: 3.68, ...}, {...}]
 * @param {*} stockCodes
 * @param {*} tradeDay
 */
export async function fetchHistoryQuotes(stockCodes, tradeDay) {
  const day = tradeDay.toISOString().substring(0, 10).replace(/-/g, '');
  const paramCode = stockCodes.map(code => `cn_${code.substring(2)}`).join(',');

  // http://q.stock.sohu.com/hisHq?code=cn_601988,cn_601288&start=20170921&end=20170921&r=asdf
  const response = await fetch(`/hisHq?code=${paramCode}&start=${day}&end=${day}&r=${new Date().getTime()}`);
  const text = await readAsText(response);

  return JSON.parse(text).map((stockData) => {
    const stockCodeWithoutPrefix = stockData.code.substring(3);
    const fullStockCode = stockCodes.find(code => code.includes(stockCodeWithoutPrefix));
    // hq is an array which has values: [日期, 开盘价, 收盘价, 涨跌额, 涨跌幅, 最低价, 最高价, 成交量, 未知, 换手率]
    return {
      stockCode: fullStockCode,
      openAt: parseFloat(stockData.hq[0][1]),
      closeAt: parseFloat(stockData.hq[0][2]),
      lowestAt: parseFloat(stockData.hq[0][5]),
      highestAt: parseFloat(stockData.hq[0][6]),
    };
  });
}
