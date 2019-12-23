import { ZOOM } from '../settings';

// 使用每个股票的zoom系数调整涨跌幅，比如工行涨1.1%，系数为1，交行涨1.55%，系数为0.67，此时应该触发工行的交易信号，
// 因为工行实际上涨1.1% (1.1% * 1) 大于 交行实际上涨1.04%(1.55% * 0.67)
const getFixedRatio = (stock, ratio) => {
  const zoomFactor = ZOOM[stock.stockCode] ? ZOOM[stock.stockCode] : 1.0;
  return ratio * zoomFactor;
};

const getStockWithMinSellingRatio = (stocks) => [...stocks].sort((a, b) => getFixedRatio(a, a.sellingRatio) - getFixedRatio(b, b.sellingRatio))[0];

const getStockWithMaxBuyingRatio = (stocks) => [...stocks].sort((a, b) => getFixedRatio(b, b.buyingRatio) - getFixedRatio(a, a.buyingRatio))[0];

const getGapBetween = (ratio1, ratio2) => Math.round((ratio1 - ratio2) * 100) / 100;

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

export const getBuyGap = (stocks, stockToBuy) => {
  const stockWithMaxBuyingRatio = getStockWithMaxBuyingRatio(stocks);
  // Gap could be a negative value, which means any trade will lose.
  const gap = getGapBetween(stockWithMaxBuyingRatio.buyingRatio, stockToBuy.sellingRatio);
  return {
    value: gap,
    compareWith: {
      stockCode: stockWithMaxBuyingRatio.stockCode,
      stockName: stockWithMaxBuyingRatio.name,
      ratio: stockWithMaxBuyingRatio.buyingRatio,
      price: stockWithMaxBuyingRatio.buyingAt,
    },
  };
};

export const calcBuyingGap = (stocks = [{
  code: '',
  buyingAt: 0,
  buyingRatio: 0,
  sellingAt: 0,
  sellingRatio: 0,
}], availableCash = 0) => {
  const stockMayBuy = getStockWithMinSellingRatio(stocks);
  const gap = getBuyGap(stocks, stockMayBuy);

  return {
    ...gap,
    toBuy: {
      stockCode: stockMayBuy.stockCode,
      stockName: stockMayBuy.name,
      price: stockMayBuy.sellingAt,
      maxAmount: cutoffAmount(stockMayBuy.sellingAt, availableCash),
    },
    timestamp: new Date().getTime(),
  };
};

export const getSellGap = (stocks, stockToSell) => {
  const stockWithMinSellingRatio = getStockWithMinSellingRatio(stocks);
  const gap = getGapBetween(stockToSell.buyingRatio, stockWithMinSellingRatio.sellingRatio);
  return {
    value: gap,
    compareWith: {
      stockCode: stockWithMinSellingRatio.stockCode,
      stockName: stockWithMinSellingRatio.name,
      ratio: stockWithMinSellingRatio.buyingRatio,
      price: stockWithMinSellingRatio.buyingAt,
    },
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
  holdings = [{ stockCode: '', sellableAmount: 0 }],
) => {
  // const stockWithMinSellingRatio = getStockWithMinSellingRatio(stocks);

  const holdingStocks = holdings
    .filter((holding) => holding.sellableAmount > 0)
    .reduce((acc, holding) => { acc[holding.stockCode] = holding.sellableAmount; return acc; }, {});
  const sellableStocks = stocks.filter((stock) => Object.keys(holdingStocks).includes(stock.stockCode));
  const stockMaySell = getStockWithMaxBuyingRatio(sellableStocks);

  // No sellable holdings
  if (!stockMaySell) {
    return null;
  }

  const gap = getSellGap(stocks, stockMaySell);
  return {
    ...gap,
    toSell: {
      stockCode: stockMaySell.stockCode,
      stockName: stockMaySell.name,
      price: stockMaySell.buyingAt,
      maxAmount: holdingStocks[stockMaySell.stockCode],
    },
    timestamp: new Date().getTime(),
  };
};
