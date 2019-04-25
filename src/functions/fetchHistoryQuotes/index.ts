import { config, DynamoDB } from 'aws-sdk';
import { get, readAsDom, respond } from '../httpHelper';

// config.update({
//   endpoint: 'http://host.docker.internal:8000',
// });

function toISODateString(date: string): string {
  return new Date(Date.parse(date)).toISOString().substring(0, 10);
}

async function getQuote(stockCode: string, day: string): Promise<object> {
  // http://vip.stock.finance.sina.com.cn/quotes_service/view/vMS_tradehistory.php?symbol=sz000001&date=2019-1-8
  const response = await get(`http://vip.stock.finance.sina.com.cn/quotes_service/view/vMS_tradehistory.php?symbol=${stockCode}&date=${day}`);

  const $ = await readAsDom(response);
  const quoteString = $('#quote_area').text();
  // quoteString is a string containing
  // 收盘价:9.66
  // 涨跌幅:-0.82%
  // 前收价:9.74
  // 开盘价:9.73
  // 最高价:9.74
  // 最低价:9.62
  // 成交量(手):402388.11
  // 成交额(千元):389247.80
  const quoteData = quoteString.split('\n').reduce((result, line): object => {
    if (line.includes(':')) {
      const [name, value] = line.split(':');
      return Object.assign(result, { [name.trim()]: value.trim() });
    }
    return result;
  }, {});

  return {
    openAt: parseFloat(quoteData['开盘价']),
    closeAt: parseFloat(quoteData['收盘价']),
    lowestAt: parseFloat(quoteData['最低价']),
    highestAt: parseFloat(quoteData['最高价']),
  };
}

export default respond(async (event): Promise<object> => {
  const { stockCode, date } = event.queryStringParameters;
  const day = toISODateString(date);

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
