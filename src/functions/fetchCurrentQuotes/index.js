import https from 'https';

const get = (...args) => new Promise((resolve, reject) => {
  https.get(...args, (response) => {
    const chunks = [];
    response.on('data', chunk => chunks.push(chunk));
    response.on('end', () => resolve({ ...response, data: chunks.join('') }));
  }).on('error', reject);
});


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
      timestamp: new Date(`${rawValues[30]} ${rawValues[31]}`).toISOString(),
    };
    return stock;
  });

export const handler = async (event, context, callback) => {
  try {
    const { stockCodes } = event.queryStringParameters;
    const response = await get(`https://hq.sinajs.cn/rn=${new Date().getTime()}&list=${stockCodes}`);
    const result = parse(response.data);

    callback(null, {
      statusCode: 200,
      body: JSON.stringify(result),
    });
  } catch (error) {
    console.error(error);
    callback(null, {
      statusCode: 500,
      body: JSON.stringify({
        Error: error.message || error,
        Reference: context.awsRequestId,
      }),
    });
  }
};
