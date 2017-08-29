import { isTradeTime, sleep } from './time';
import { THRESHOLD } from './settings';
import { setBadge, sendNotification } from './chromeApi';
import { buyStock, sellStock } from './newoneApi';
import { GET_PORTFOLIO, GET_TRADE_SUGGESTION, PLACE_ORDER } from './actions';
import { getPortfolio, getGaps } from './jobs';

const sendTradeSignal = ({ gap = 0, trade = '', stock = '', price = 0, additional = '' }) => {
  const title = `价差${gap}%`;
  const message = `${trade} ${stock} ${price} ${additional}`;
  sendNotification({ title, message });
};

const watchGaps = async () => {
  try {
    if (isTradeTime()) {
      const gaps = await getGaps();

      if (gaps.buying.value >= THRESHOLD && gaps.buying.toBuy.maxAmount > 0) {
        sendTradeSignal({ gap: gaps.buying.value,
          trade: '买',
          stock: gaps.buying.toBuy.stockName,
          price: gaps.buying.toBuy.price,
          additional: `相比${gaps.buying.compareWith.stockName}`,
        });
      }

      if (gaps.selling.value >= THRESHOLD) {
        sendTradeSignal({ gap: gaps.selling.value,
          trade: '卖',
          stock: gaps.selling.toSell.stockName,
          price: gaps.selling.toSell.price,
          additional: `相比${gaps.selling.compareWith.stockName}`,
        });
      }

      setBadge(gaps.buying.value.toString());
    } else {
      setBadge('');
    }
  } catch (e) {
    console.error(e);
    sendNotification({ title: e.message });
  } finally {
    await sleep(3);
    watchGaps();
  }
};
watchGaps();

sendNotification({ title: 'StockEye 启动' });

const run = async (block) => {
  try {
    await block();
  } catch (e) {
    console.error(e);
  }
};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // a listener cannot be a async function because it causes sending sendResponse asynchronously
  // failed. However, the listener can be an async function if using sendResponse synchronously
  // regardless the rest part of code uses await or not.
  run(async () => {
    // wrap async code in a function, then the listener does not have to be an async one, which
    // makes calling sendResponse asynchronously work.
    const payload = message.payload;
    switch (message.type) {
      case GET_PORTFOLIO:
        sendResponse(await getPortfolio());
        break;
      case GET_TRADE_SUGGESTION:
        sendResponse(await getGaps());
        break;
      case PLACE_ORDER:
        try {
          if (payload.type === 'buy') {
            await buyStock(payload.stockCode, payload.price, payload.amount);
          } else if (payload.type === 'sell') {
            await sellStock(payload.stockCode, payload.price, payload.amount);
          }
          sendResponse('下单成功');
          sendNotification({ title: '下单成功', message: JSON.stringify(payload) });
        } catch (error) {
          sendResponse(`下单失败：${error.message}`);
          sendNotification({ title: '下单失败', message: error.message });
        }
        break;
      default:
        throw new Error(`Unknown message type ${message.type}`);
    }
  });
  return true;
});
