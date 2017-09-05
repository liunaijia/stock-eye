import { getPortfolio as getPortfolioFromApi } from '../newoneApi';
import { runDuringTradeTime } from './job';

let portfolio;
export const reloadPortfolio = async () => {
  portfolio = await getPortfolioFromApi();
};

runDuringTradeTime({ interval: 10, runOnStartUp: false })(reloadPortfolio);

// eslint-disable-next-line import/prefer-default-export
export const getPortfolio = async () => {
  if (!portfolio) { await reloadPortfolio(); }
  // console.log('portfolioJob.getPortfolio: ', portfolio);
  return portfolio;
};
