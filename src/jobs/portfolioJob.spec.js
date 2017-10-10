/* eslint-disable global-require */
describe('portfolioJob', () => {
  let newoneApi;
  let portfolio;

  beforeEach(() => {
    jest.resetModules();
    newoneApi = require('../newoneApi');

    portfolio = {};
    newoneApi.getPortfolio = jest.fn().mockReturnValue(portfolio);
  });

  function setIsTradeTime(mockValue) {
    jest.doMock('../time', () => ({
      isTradeTime: jest.fn().mockReturnValue(mockValue),
      sleep: jest.fn().mockReturnValue(new Promise(() => {})),
    }));
  }

  describe('import portfolioJob', () => {
    it('calls the api to get portfolio in trade time', () => {
      setIsTradeTime(true);

      require('./portfolioJob');

      expect(newoneApi.getPortfolio).toBeCalled();
    });

    it('does not call the api to get portfolio when out of trade time', () => {
      setIsTradeTime(false);

      require('./portfolioJob');

      expect(newoneApi.getPortfolio).not.toBeCalled();
    });
  });

  describe('getPortfolio', () => {
    it('returns portfolio from the api', async () => {
      setIsTradeTime(false);
      const portfolioJob = require('./portfolioJob');

      const result = await portfolioJob.getPortfolio();

      expect(newoneApi.getPortfolio).toBeCalled();
      expect(result).toBe(portfolio);
    });

    it('caches the portfolio from the api', async () => {
      setIsTradeTime(false);
      const portfolioJob = require('./portfolioJob');

      await portfolioJob.getPortfolio();
      expect(newoneApi.getPortfolio).toHaveBeenCalledTimes(1);

      await portfolioJob.getPortfolio();
      expect(newoneApi.getPortfolio).toHaveBeenCalledTimes(1);
    });
  });
});
/* eslint-enable global-require */
