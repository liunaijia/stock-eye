import { memoize } from 'lodash-es';
import { fetchCurrentQuotes } from '../apis';

export default {
  state: {
    // [stockCode]: {
    //   code:
    //   name:
    //   openAt:
    //   closeAt:
    //   current:
    //   buyingAt:
    //   sellingAt:
    //   buyingBids:
    //   sellingBids:
    //   timestamp:
    // }
  },
  reducers: {
    add(state, payload) {
      return { ...state, [payload.stockCode]: payload };
    },
  },
  effects: dispatch => ({
    async fetch(payload) {
      const quotes = await fetchCurrentQuotes(payload.stockCodes);
      return Promise.all(quotes.map(quote => dispatch.currentQuotes.add(quote)));
    },
  }),
  selectors: (slice, createSelector, hasProps) => ({
    self() {
      return slice;
    },
    getByStockCode() {
      return createSelector(
        this.self,
        state => memoize(
          stockCode => state[stockCode],
        ),
      );
    },
  }),
};
