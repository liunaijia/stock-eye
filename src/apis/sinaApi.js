import { readAsText } from '../responseHelper';

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

export async function fetchCurrentQuotes(stockCodes) {
  const response = await fetch(`/sinajs/rn=${new Date().getTime()}&list=${stockCodes.join(',')}`);
  const text = await readAsText(response);

  return parse(text);
}
