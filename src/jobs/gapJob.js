import { runDuringTradeTime } from './job';
import { fetchStocks } from '../stockData';
import { STOCK_GROUPS, STOCK_CODES } from '../settings';
import { getPortfolio } from './portfolioJob';
import { calcBuyingGap, calcSellingGap } from '../gapService';

const gapGroups = {};

const calcGaps = async () => {
  const portfolio = await getPortfolio();

  Object.entries(STOCK_GROUPS).forEach(async ([groupName, group]) => {
    const stocks = await fetchStocks(group.stocks);

    // calculate gap to buy stock
    const buyingGap = calcBuyingGap(stocks, portfolio.availableCash);

    // calculate gap to sell holding stock
    const sellingGap = calcSellingGap(stocks, portfolio.holdings);

    gapGroups[groupName] = { buying: buyingGap, selling: sellingGap, threshold: group.threshold };
  });
};

runDuringTradeTime({ interval: 3, runOnStartUp: false })(calcGaps);

// eslint-disable-next-line import/prefer-default-export
export const getGaps = async () => {
  if (!Object.keys(gapGroups).length) { await calcGaps(); }
  // console.log('gapJob.getGaps: ', gapGroups);
  return gapGroups;
};
