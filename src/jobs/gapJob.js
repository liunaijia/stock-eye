import { runDuringTradeTime } from './job';
import { fetchStocks } from '../stockData';
import { STOCK_GROUPS, STOCK_CODES } from '../settings';
import { getPortfolio } from './portfolioJob';
import { calcBuyingGap, calcSellingGap } from '../gapService';

const gapGroups = {};

const calcGaps = async () => {
  const allStocks = await fetchStocks(STOCK_CODES);
  const portfolio = await getPortfolio();

  Object.entries(STOCK_GROUPS).forEach(([groupName, group]) => {
    const stockCodesInGroup = Object.keys(group.stocks);
    const stocks = allStocks.filter(stock => stockCodesInGroup.includes(stock.code));

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
  console.log('gapJob.getGaps: ', gapGroups);
  return gapGroups;
};
