import { memoize } from 'lodash-es';
import { fetchCurrentQuotes } from '../apis';

export default {
  state: {
    // [stockCode]: {
    //   stockCode:
    //   name:
    //   openAt:
    //   closeAt:
    //   current:
    //   buyingAt:
    //   sellingAt:
    //   buyingBids: not saved
    //   sellingBids: not saved
    //   timestamp: not saved
    // }
  },
  reducers: {
    // batch add quotes, payload is an array of quotes
    add(state, payload) {
      // some props are excluded as they get changed frequently and making suggestion doesn't care about their changes
      const data = payload.reduce((result, {
        buyingBids, sellingBids, timestamp, ...quote
      }) => Object.assign(result, { [quote.stockCode]: quote }),
      {});
      return { ...state, ...data };
    },
  },
  effects: dispatch => ({
    async fetch(payload) {
      const quotes = await fetchCurrentQuotes(payload.stockCodes);
      return dispatch.currentQuotes.add(quotes);
    },
  }),
  selectors: (slice, createSelector, hasProps) => ({
    self() {
      return slice;
    },
    getBy() {
      return createSelector(
        this.self,
        state => memoize(
          // freeze value in case it gets modified from outside
          stockCode => Object.freeze(state[stockCode]),
        ),
      );
    },
  }),
};
