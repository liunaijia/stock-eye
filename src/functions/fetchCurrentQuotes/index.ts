import { get, readyAsText, respond } from '../httpHelper';

interface Bid {
  price: number;
  amount: number;
}

function getValueFrom(array: string[], index: number): number {
  return parseFloat(array[index]);
}

function getValuesFrom(array: string[], index: number, length: number): number[] {
  return Array.from({ length }, (_, i): number => getValueFrom(array, index + i));
}

function collapseArray(array: number[]): Bid[] {
  return array.reduce((acc, _, idx): Bid[] => {
    if (idx % 2 === 0) {
      acc.push({
        price: array[idx + 1],
        amount: array[idx],
      });
    }
    return acc;
  }, []);
}

interface ParsedResult {
  stockCode: string;
  name: string;
  openAt: number;
  closeAt: number;
  current: number;
  buyingAt: number; // 竞买价，即“买一“报价
  sellingAt: number; // 竞卖价，即“卖一“报价
  buyingBids: Bid[];
  sellingBids: Bid[];
  timestamp: string;
}

function parse(text = ''): ParsedResult[] {
  return text
    .split(';')
    .slice(0, -1)
    .map((line): [string, string[]] => {
      const [, variable = '', valueExp = ''] = /(.*?)="(.*?)"/.exec(line);
      return [variable.substr(variable.lastIndexOf('_') + 1), valueExp.split(',')];
    })
    .map(([stockCode, rawValues]): ParsedResult => {
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
        timestamp: new Date(`${rawValues[30]} ${rawValues[31]}`).toISOString(),
      };
      return stock;
    });
}

export default respond(async (event): Promise<object> => {
  const { stockCodes } = event.queryStringParameters;
  const response = await get(`https://hq.sinajs.cn/rn=${new Date().getTime()}&list=${stockCodes}`);
  const body = await readyAsText(response);
  const result = parse(body);

  return result;
});
