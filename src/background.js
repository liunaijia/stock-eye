import isTradeTime from './tradeTime';
import { STOCK_POOL, THRESHOLD } from './settings';
import fetchStockData from './stockData';
import { setBadge, sendNotification } from './chromeApi';
import { buyStock, getPortfolio, sellStock } from './newoneApi';
import { GET_PORTFOLIO } from './actions';

const process = (stocks = [{ buyingRatio: 0, sellingRatio: 0 }]) => {
  const stockMayBuy = stocks.sort((a, b) => a.sellingRatio - b.sellingRatio)[0];
  const stockMaySell = stocks.sort((a, b) => b.buyingRatio - a.buyingRatio)[0];

  const gap = Math.round((stockMaySell.buyingRatio - stockMayBuy.sellingRatio) * 100) / 100;
  setBadge(gap.toString());

  if (gap > THRESHOLD) {
    return {
      gap,
      buy: {
        stockCode: stockMayBuy.code,
        stockName: STOCK_POOL[stockMayBuy.code],
        price: stockMayBuy.sellingAt,
      },
      sell: {
        stockCode: stockMaySell.code,
        stockName: STOCK_POOL[stockMaySell.code],
        price: stockMaySell.buyingAt,
      },
      timestamp: new Date().getTime(),
    };
  }

  // console.log(`${gap} B:${STOCK_POOL[stockMayBuy.code]}${stockMayBuy.sellingRatio}% S:${STOCK_POOL[stockMaySell.code]}${stockMaySell.buyingRatio}%`);
  return null;
};

const sendTradeSignal = ({
  gap = 0,
  buy: { stockName: buyStockName, price: buyPrice },
  sell: { stockName: sellStockname, price: sellPrice },
}) => {
  const title = `价差${gap}%`;
  const message = `买${buyStockName} ${buyPrice}，卖${sellStockname} ${sellPrice}`;
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
let tradeSignal = null;
runDuringTradeTime()(async () => {
  const stocks = await fetchStockData();
  tradeSignal = process(stocks);
  if (tradeSignal) {
    sendTradeSignal(tradeSignal);
    // console.log(tradeSignal);
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

const createTradeSuggestion = () => {
  if (tradeSignal == null) {
    return null;
  }

  const suggestion = { ...tradeSignal };
  suggestion.balance = portfolio.availableCash;
  suggestion.buy.maxAmount = cutoffAmount(suggestion.buy.price, portfolio.availableCash);

  const holding = portfolio.holdings.find(h => h.stockCode === suggestion.sell.stockCode);
  suggestion.sell.maxAmount = holding ? holding.sellableAmount : 0;
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
    if (message.type === GET_PORTFOLIO) {
      if (!portfolio) {
        portfolio = await getPortfolio();
      }
      // debugger;
      sendResponse(portfolio);
    }
    if (message.type === 'GET_SUGGESTION') {
      sendResponse(createTradeSuggestion());
    }
    if (message.type === 'PLACE_ORDER') {
      const payload = message.payload;
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
    }
  });
  return true;
});
