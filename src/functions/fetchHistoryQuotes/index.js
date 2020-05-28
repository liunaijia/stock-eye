// @flow
import { DynamoDB } from 'aws-sdk';
import {
  get, respond, readAsJson,
} from '../httpHelper';
import {
  toTimezone, fromTimezone, formatDateTime, formatDate,
} from '../timeHelper';

// AWS.config.update({
// endpoint: 'http://host.docker.internal:8000',
// });

function createRequestCookies(responseCookies: string[]): string {
  return responseCookies
    .map((cookie): string => cookie.split(';')[0])
    .join('; ');
}

function parse(responseData) {
  const { column, item } = responseData.data;
  const result = column.reduce((memo, col, index) => Object.assign(memo, { [col]: item[0][index] }), { });
  return Object.assign(result, { timestamp: formatDateTime(fromTimezone(result.timestamp)) });
}

async function getCookies(): Promise<string[]> {
  const response = await get('https://xueqiu.com/');
  return response.headers['set-cookie'];
}

async function getQuote(stockCode: string, day: string): Promise<any> {
  const cookies = await getCookies();

  const date = toTimezone(day).getTime();
  // https://stock.xueqiu.com/v5/stock/chart/kline.json?symbol=SZ002142&begin=1556121600000&period=day&count=-1&indicator=kline
  const url = `https://stock.xueqiu.com/v5/stock/chart/kline.json?symbol=${stockCode.toUpperCase()}&begin=${date}&period=day&count=-1&indicator=kline&type=before`;
  const response = await get(url, { cookie: createRequestCookies(cookies) });
  const data = await readAsJson(response);
  return parse(data);
}

export default respond(async (event): Promise<{}> => {
  const { stockCode, date } = event.queryStringParameters;
  const day = formatDate(date);

  const tableName = process.env.DailyQuotesTable;
  const client = new DynamoDB.DocumentClient();

  const output = await client.get({
    TableName: tableName,
    Key: { day, stockCode },
  }).promise();
  if (output.Item) {
    return output.Item;
  }

  const result = await getQuote(stockCode, day);
  const item = { day, stockCode, ...result };

  await client.put({
    TableName: tableName,
    Item: item,
  }).promise();

  return item;
});
