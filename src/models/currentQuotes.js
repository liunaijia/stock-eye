import { memoize, isEqual } from 'lodash-es';
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
    add(state, payload) {
      // some props are excluded as they get changed frequently and making suggestion doesn't care about their changes
      const {
        buyingBids, sellingBids, timestamp, ...quote
      } = payload;
      // skip update if there is no changes, it saves selectors from running.
      if (isEqual(quote, state[quote.stockCode])) {
        return state;
      }
      return { ...state, [quote.stockCode]: quote };
    },
  },
  effects: dispatch => ({
    async fetch(payload) {
      const quotes = await fetchCurrentQuotes(payload.stockCodes);
      return Promise.all(
        quotes.map(
          quote => dispatch.currentQuotes.add(quote),
        ),
      );
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
