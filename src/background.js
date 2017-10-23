import { isTradeTime, sleep } from './time';
import { THRESHOLD, HOLDING_NEW_STOCK } from './settings';
import { setBadge, sendNotification } from './chromeApi';
import { buyStock, sellStock } from './newoneApi';
import { GET_PORTFOLIO, GET_TRADE_SUGGESTION, PLACE_ORDER } from './actions';
import { getPortfolio, reloadPortfolio, getGaps } from './jobs';
import { fetchStocks } from './stockData';

const sendTradeSignal = ({
  group = '', gap = 0, trade = '', stock = '', price = 0, additional = '',
}) => {
  const title = `${group}组合价差${gap}%`;
  const message = `${trade} ${stock} ${price} ${additional}`;
  sendNotification({ title, message });
};

const calcThreshold = (stockCode1, stockCode2) => {
  const { base } = THRESHOLD;
  const stock1Threshold = THRESHOLD[stockCode1] ? THRESHOLD[stockCode1] : base;
  const stock2Threshold = THRESHOLD[stockCode2] ? THRESHOLD[stockCode2] : base;

  return base + Math.abs(stock1Threshold - stock2Threshold);
};

let rememberedAmount = 0;

const watchGaps = async () => {
  try {
    if (isTradeTime()) {
      let maxGap = 0;
      Object.entries(await getGaps()).forEach(([group, gaps]) => {
        const buyingGap = gaps.buying;
        const buyingThreshold = calcThreshold(
          buyingGap.toBuy.stockCode,
          buyingGap.compareWith.stockCode,
        );
        if (buyingGap.value >= buyingThreshold && buyingGap.toBuy.maxAmount > 0) {
          sendTradeSignal({
            group,
            gap: buyingGap.value,
            trade: '买',
            stock: buyingGap.toBuy.stockName,
            price: buyingGap.toBuy.price,
            additional: `相比${buyingGap.compareWith.stockName} ${buyingGap.compareWith.price}`,
          });
        }

        const sellingGap = gaps.selling;
        if (sellingGap) {
          const sellingThreshold = calcThreshold(
            sellingGap.toSell.stockCode,
            sellingGap.compareWith.stockCode,
          );
          if (sellingGap.value >= sellingThreshold) {
            sendTradeSignal({
              group,
              gap: sellingGap.value,
              trade: '卖',
              stock: sellingGap.toSell.stockName,
              price: sellingGap.toSell.price,
              additional: `相比${sellingGap.compareWith.stockName} ${sellingGap.compareWith.price}`,
            });
          }
        }

        maxGap = Math.max(maxGap, buyingGap.value, sellingGap ? sellingGap.value : 0);
      });

      setBadge(maxGap.toString());

      // extra steps
      if (HOLDING_NEW_STOCK) {
        const [newStock] = await fetchStocks([HOLDING_NEW_STOCK]);
        const buyingAmount = newStock.buyingBids[0].amount;
        if (newStock.current !== newStock.openAt && newStock.openAt > 0) {
          sendNotification({ title: '新股开板！', message: `开盘 ${newStock.openAt} 现价 ${newStock.current}` });
        }
        if (buyingAmount < 0.9 * rememberedAmount || rememberedAmount === 0) {
          sendNotification({ title: '新股', message: `买一价手数：${Math.round(buyingAmount / 100)}` });
          rememberedAmount = buyingAmount;
        }
      }
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
    const { payload } = message;
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
          reloadPortfolio();
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
