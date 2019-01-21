import { readAsText, readAsDom } from './responseHelper';

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
      stockCode,
      name: rawValues[0],
      openAt: getValueFrom(rawValues, 1),
      closeAt: getValueFrom(rawValues, 2),
      current: getValueFrom(rawValues, 3),
      buyingAt: getValueFrom(rawValues, 6), // 竞买价，即“买一“报价
      sellingAt: getValueFrom(rawValues, 7), // 竞卖价，即“卖一“报价
      buyingBids: collapseArray(getValuesFrom(rawValues, 10, 10)),
      sellingBids: collapseArray(getValuesFrom(rawValues, 20, 10)),
      timestamp: new Date(`${rawValues[30]} ${rawValues[31]}`),
    };
    return stock;
  });

export async function fetchCurrentQuotes(stockCodes) {
  const response = await fetch(`/current_quotes/rn=${new Date().getTime()}&list=${stockCodes.join(',')}`);
  const text = await readAsText(response);

  return parse(text);
}

export async function fetchHistoryQuote(stockCode, tradeDay) {
  // http://vip.stock.finance.sina.com.cn/quotes_service/view/vMS_tradehistory.php?symbol=sz000001&date=2019-1-8
  const cache = await caches.open('stock-eye');
  const date = tradeDay.toISOString().substring(0, 10);
  const url = `/history_quote?symbol=${stockCode}&date=${date}`;
  let response = await cache.match(url);
  if (!response) {
    await cache.add(url);
    response = await cache.match(url);
  }
  const dom = await readAsDom(response);
  const quoteString = dom.querySelector('#quote_area').textContent;
  // quoteString is a string containing
  // 收盘价:9.66
  // 涨跌幅:-0.82%
  // 前收价:9.74
  // 开盘价:9.73
  // 最高价:9.74
  // 最低价:9.62
  // 成交量(手):402388.11
  // 成交额(千元):389247.80
  const quoteData = quoteString.split('\n').reduce((result, line) => {
    if (line.includes(':')) {
      const [name, value] = line.split(':');
      return Object.assign(result, { [name.trim()]: value.trim() });
    }
    return result;
  }, {});

  return {
    stockCode,
    openAt: parseFloat(quoteData['开盘价']),
    closeAt: parseFloat(quoteData['收盘价']),
    lowestAt: parseFloat(quoteData['最低价']),
    highestAt: parseFloat(quoteData['最高价']),
  };
}
