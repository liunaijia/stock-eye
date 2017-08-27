import isTradeTime from './tradeTime';
import { STOCK_POOL, THRESHOLD } from './settings';
import { fetchAllStocks } from './stockData';
import { setBadge, sendNotification } from './chromeApi';
import { buyStock, getPortfolio, sellStock } from './newoneApi';
import { GET_TRADE_SUGGESTION, PLACE_ORDER } from './actions';

const calcGap = (stocks = [{ code: '',
  current: 0,
  buyingAt: 0,
  buyingBids: [],
  buyingRatio: 0,
  sellingAt: 0,
  sellingBids: [],
  sellingRatio: 0 }]) => {
  const stockMayBuy = stocks.sort((a, b) => a.sellingRatio - b.sellingRatio)[0];
  const stockMaySell = stocks.sort((a, b) => b.buyingRatio - a.buyingRatio)[0];

  const gap = Math.round((stockMaySell.buyingRatio - stockMayBuy.sellingRatio) * 100) / 100;
  // Gap could be a negative value, which means any trade will lose.

  return {
    value: gap,
    toBuy: {
      stockCode: stockMayBuy.code,
      stockName: STOCK_POOL[stockMayBuy.code],
      price: stockMayBuy.sellingAt,
      quotes: {
        current: stockMayBuy.current,
        buyingBids: stockMayBuy.buyingBids,
        sellingBids: stockMayBuy.sellingBids,
      },
    },
    toSell: {
      stockCode: stockMaySell.code,
      stockName: STOCK_POOL[stockMaySell.code],
      price: stockMaySell.buyingAt,
      quotes: {
        current: stockMaySell.current,
        buyingBids: stockMaySell.buyingBids,
        sellingBids: stockMaySell.sellingBids,
      },
    },
    timestamp: new Date().getTime(),
  };
};

const sendTradeSignal = ({ gap = 0, stockToBuy = '', priceToBuy = 0, stockToSell = '', priceToSell = 0 }) => {
  const title = `价差${gap}%`;
  const message = `买${stockToBuy} ${priceToBuy}，卖${stockToSell} ${priceToSell}`;
  sendNotification({ title, message });
};

const sleep = async seconds => new Promise(resolve => setTimeout(resolve, seconds * 1000));

const runDuringTradeTime = (interval = 3) => async (block) => {
  try {
    const now = new Date();
    if (isTradeTime(now)) {
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

// watch stocks
let currentGap = null;
runDuringTradeTime()(async () => {
  const stocks = await fetchAllStocks();
  currentGap = calcGap(stocks);
  setBadge(currentGap.value.toString());
  if (currentGap.value >= THRESHOLD) {
    sendTradeSignal({ gap: currentGap.value,
      stockToBuy: currentGap.toBuy.stockName,
      priceToBuy: currentGap.toBuy.price,
      stockToSell: currentGap.toSell.stockName,
      priceToSell: currentGap.toSell.price });
  }
});

// refresh portfolio
let portfolio = null;
runDuringTradeTime(10)(async () => {
  portfolio = await getPortfolio();
});

sendNotification({ title: 'StockEye 启动' });

const cutoffAmount = (price = 0, balance = 0, commission = 5) => {
  const amount = Math.floor(balance / price / 100) * 100;
  if (amount <= 0) {
    return 0;
  }

  const cost = amount * price * (1 + (commission / 10000));
  if (balance < cost) {
    return amount - 100;
  }
  return amount;
};

const createTradeSuggestion = async () => {
  if (currentGap == null) {
    const stocks = await fetchAllStocks();
    currentGap = calcGap(stocks);
  }

  const suggestion = { ...currentGap };
  suggestion.toBuy.maxAmount = cutoffAmount(suggestion.toBuy.price, portfolio.availableCash);

  const holding = portfolio.holdings.find(h => h.stockCode === suggestion.toSell.stockCode);
  suggestion.toSell.maxAmount = holding ? holding.sellableAmount : 0;

  return suggestion;
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
