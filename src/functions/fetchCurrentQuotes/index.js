import https from 'https';
import util from 'util';

const get = util.promisify(https.get);

export const handler = async (event, context, callback) => {
  try {
    // const stockCodes = ['sz000001'];
    // try {
    //   const response = await get(`https://hq.sinajs.cn/rn=${new Date().getTime()}&list=${stockCodes.join(',')}`);
    //   console.log(2);
    //   return response;
    // } catch (e) {
    //   console.log(e.message);
    // }

    callback(null, {
      statusCode: 200,
      body: event.body,
      // JSON.stringify({
      //   RideId: rideId,
      //   Unicorn: unicorn,
      //   UnicornName: unicorn.Name,
      //   Eta: '30 seconds',
      //   Rider: username,
      // }),
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    callback(null, {
      statusCode: 500,
      body: JSON.stringify({
        Error: error.message,
        Reference: context.awsRequestId,
      }),
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    });
  }
};
