import { runDuringTradeTime } from './job';
import { fetchAllStocks } from '../stockData';
import { getPortfolio } from './portfolioJob';
import { calcBuyingGap, calcSellingGap } from '../gapService';

let gaps;

const calcGaps = async () => {
  const stocks = await fetchAllStocks();
  const portfolio = await getPortfolio();

  // calculate gap to buy stock
  const buyingGap = calcBuyingGap(stocks, portfolio.availableCash);

  // calculate gap to sell holding stock
  const sellingGap = calcSellingGap(stocks, portfolio.holdings);

  gaps = { buying: buyingGap, selling: sellingGap };
};

runDuringTradeTime({ interval: 3, runOnStartUp: false })(calcGaps);

// eslint-disable-next-line import/prefer-default-export
export const getGaps = async () => {
  if (!gaps) { await calcGaps(); }
  console.log('gapJob.getGaps: ', gaps);
  return gaps;
};
