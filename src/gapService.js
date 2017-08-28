import { STOCK_POOL } from './settings';

const getStockWithMinSellingRatio = stocks =>
  stocks.sort((a, b) => a.sellingRatio - b.sellingRatio)[0];

const getStockWithMaxBuyingRatio = stocks =>
  stocks.sort((a, b) => b.buyingRatio - a.buyingRatio)[0];

const getGapBetween = (ratio1, ratio2) =>
  Math.round((ratio1 - ratio2) * 100) / 100;

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
export const calcBuyingGap = (
  stocks = [{
    code: '',
    buyingAt: 0,
    buyingRatio: 0,
    sellingAt: 0,
    sellingRatio: 0,
  }], availableCash = 0) => {
  const stockMayBuy = getStockWithMinSellingRatio(stocks);
  const stockWithMaxBuyingRatio = getStockWithMaxBuyingRatio(stocks);

  const gap = getGapBetween(stockWithMaxBuyingRatio.buyingRatio, stockMayBuy.sellingRatio);
  // Gap could be a negative value, which means any trade will lose.

  return {
    value: gap,
    toBuy: {
      stockCode: stockMayBuy.code,
      stockName: STOCK_POOL[stockMayBuy.code],
      price: stockMayBuy.sellingAt,
      maxAmount: cutoffAmount(stockMayBuy.sellingAt, availableCash),
    },
    compareWith: {
      stockCode: stockWithMaxBuyingRatio.code,
      stockName: STOCK_POOL[stockWithMaxBuyingRatio.code],
      price: stockWithMaxBuyingRatio.buyingAt,
    },
    timestamp: new Date().getTime(),
  };
};


export const calcSellingGap = (
  stocks = [{
    code: '',
    buyingAt: 0,
    buyingRatio: 0,
    sellingAt: 0,
    sellingRatio: 0,
  }],
  holdings = [{ stockCode: '', sellableAmount: 0 }]) => {
  const stockWithMinSellingRatio = getStockWithMinSellingRatio(stocks);

  const holdingStocks = holdings
    .filter(holding => holding.sellableAmount > 0)
    .reduce((acc, holding) => { acc[holding.stockCode] = holding.sellableAmount; return acc; }, {});
  const sellableStocks = stocks.filter(stock => Object.keys(holdingStocks).includes(stock.code));
  const stockMaySell = getStockWithMaxBuyingRatio(sellableStocks);

  const gap = getGapBetween(stockMaySell.buyingRatio, stockWithMinSellingRatio.sellingRatio);
  // Gap could be a negative value, which means any trade will lose.

  return {
    value: gap,
    toSell: {
      stockCode: stockMaySell.code,
      stockName: STOCK_POOL[stockMaySell.code],
      price: stockMaySell.buyingAt,
      maxAmount: holdingStocks[stockMaySell.code],
    },
    compareWith: {
      stockCode: stockWithMinSellingRatio.code,
      stockName: STOCK_POOL[stockWithMinSellingRatio.code],
      price: stockWithMinSellingRatio.sellingAt,
    },
    timestamp: new Date().getTime(),
  };
};
