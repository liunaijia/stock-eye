import { get, readAsDom } from '../httpHelper';

export default async (event, context, callback) => {
  try {
    const { stockCode, date } = event.queryStringParameters;
    // http://vip.stock.finance.sina.com.cn/quotes_service/view/vMS_tradehistory.php?symbol=sz000001&date=2019-1-8
    const response = await get(`http://vip.stock.finance.sina.com.cn/quotes_service/view/vMS_tradehistory.php?symbol=${stockCode}&date=${date}`);

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
    const quoteData = quoteString.split('\n').reduce((result, line) => {
      if (line.includes(':')) {
        const [name, value] = line.split(':');
        return Object.assign(result, { [name.trim()]: value.trim() });
      }
      return result;
    }, {});

    const result = {
      stockCode,
      openAt: parseFloat(quoteData['开盘价']),
      closeAt: parseFloat(quoteData['收盘价']),
      lowestAt: parseFloat(quoteData['最低价']),
      highestAt: parseFloat(quoteData['最高价']),
    };

    callback(null, {
      statusCode: 200,
      body: JSON.stringify(result),
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    console.error(error);
    callback(null, {
      statusCode: 500,
      body: JSON.stringify({
        Error: error.message || error,
        Reference: context.awsRequestId,
      }),
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    });
  }
};
