import { getPortfolio } from './portfolioJob';
import { getPortfolio as getPortfolioApi } from '../newoneApi';

jest.mock('../secrets', () => {}, { virtual: true });

jest.mock('../newoneApi', () => ({
  getPortfolio: jest.fn().mockReturnValue({ availableCash: 1000 }),
}));

jest.mock('../time', () => ({
  isTradeTime: jest.fn().mockReturnValue(false),
  sleep: jest.fn().mockReturnValue(new Promise(() => {})),
}));

describe('portfolioJob', () => {
  describe('import portfolioJob', () => {
    it('does not call the api to get portfolio when out of trade time', () => {
      expect(getPortfolioApi).not.toBeCalled();
    });
  });

  describe('getPortfolio', () => {
    it('returns portfolio from the api', async () => {
      const result = await getPortfolio();

      expect(getPortfolioApi).toBeCalled();
      expect(result).toEqual({ availableCash: 1000 });
    });

    it('caches the portfolio from the api', async () => {
      await getPortfolio();
      expect(getPortfolioApi).toHaveBeenCalledTimes(1);

      await getPortfolio();
      expect(getPortfolioApi).toHaveBeenCalledTimes(1);
    });
  });
});
