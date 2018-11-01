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
};
