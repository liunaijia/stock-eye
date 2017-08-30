import * as newoneApi from '../newoneApi';
import * as job from './job';
import { getPortfolio } from './portfolioJob';

describe('getPortfolio', async () => {
  fit('calls api to get portfolio in trade time', async () => {
    // jest.useFakeTimers();

    const reloadPortfolio = jest.fn();
    job.runDuringTradeTime = jest.fn().mockImplementation(
      () => reloadPortfolio,
    );

    // const portfolio = {};
    // newoneApi.getPortfolio = jest.fn().mockImplementation(() => Promise.resolve(portfolio));

    expect(reloadPortfolio).toBeCalled();
  });

  it('returns portfolio from the api', async () => {
    const portfolio = {};
    newoneApi.getPortfolio = jest.fn().mockImplementation(() => Promise.resolve(portfolio));

    time.isTradeTime = jest.fn().mockReturnValue(false);

    const result = await getPortfolio();

    expect(newoneApi.getPortfolio).toBeCalled();
    expect(result).toBe(portfolio);
  });

  it('caches the portfolio from the api', async () => {
    const portfolio = {};
    newoneApi.getPortfolio = jest.fn().mockImplementation(() => Promise.resolve(portfolio));

    const result = await getPortfolio();

    expect(newoneApi.getPortfolio).toBeCalled();
    expect(result).toBe(portfolio);
  });
});
