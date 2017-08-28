import { isTradeTime, sleep } from './time';
import { THRESHOLD } from './settings';
import { fetchAllStocks } from './stockData';
import { setBadge, sendNotification } from './chromeApi';
import { buyStock, getPortfolio, sellStock } from './newoneApi';
import { GET_TRADE_SUGGESTION, PLACE_ORDER } from './actions';
import { calcBuyingGap, calcSellingGap } from './gapService';

let portfolio = null;
let currentGapToBuy = null;
let currentGapToSell = null;

const sendTradeSignal = ({ gap = 0, trade = '', stock = '', price = 0 }) => {
  const title = `价差${gap}%`;
  const message = `${trade} ${stock} ${price}`;
  sendNotification({ title, message });
};

const runDuringTradeTime = (interval = 3) => async (block) => {
  try {
    if (isTradeTime()) {
      await block();
    } else {
      setBadge('');
    }
  } catch (e) {
    console.error(e);
    sendNotification({ title: e.message });
  } finally {
    await sleep(interval);
    runDuringTradeTime(interval)(block);
  }
};

const calcGaps = async () => {
  const stocks = await fetchAllStocks();

  if (!portfolio) {
    portfolio = await getPortfolio();
  }

  // calculate gap to buy stock
  currentGapToBuy = calcBuyingGap(stocks, portfolio.availableCash);

  // calculate gap to sell holding stock
  currentGapToSell = calcSellingGap(stocks, portfolio.holdings);
};

// watch stocks
runDuringTradeTime()(async () => {
  await calcGaps();

  if (currentGapToBuy.value >= THRESHOLD) {
    sendTradeSignal({ gap: currentGapToBuy.value,
      trade: '买',
      stock: currentGapToBuy.toBuy.stockName,
      price: currentGapToBuy.toBuy.price,
    });
  }

  if (currentGapToSell.value >= THRESHOLD) {
    sendTradeSignal({ gap: currentGapToSell.value,
      trade: '卖',
      stock: currentGapToSell.toSell.stockName,
      price: currentGapToSell.toSell.price,
    });
  }

  setBadge(currentGapToBuy.value.toString());
});

// refresh portfolio
runDuringTradeTime(10)(async () => {
  portfolio = await getPortfolio();
});

sendNotification({ title: 'StockEye 启动' });

const createTradeSuggestion = async () => {
  if (currentGapToBuy == null) {
    await calcGaps();
  }

  return { currentGapToBuy, currentGapToSell };
};

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
      case GET_TRADE_SUGGESTION:
        sendResponse(await createTradeSuggestion());
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
