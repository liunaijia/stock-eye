import './portfolioJob';
import { getPortfolio } from '../newoneApi';

jest.mock('../secrets', () => {}, { virtual: true });

jest.mock('../newoneApi', () => ({
  getPortfolio: jest.fn().mockReturnValue({}),
}));

jest.mock('../time', () => ({
  isTradeTime: jest.fn().mockReturnValue(true),
  sleep: jest.fn().mockReturnValue(new Promise(() => {})),
}));

describe('portfolioJob at trade time', () => {
  describe('import portfolioJob', () => {
    it('calls the api to get portfolio at trade time', () => {
      expect(getPortfolio).toBeCalled();
    });
  });
});
