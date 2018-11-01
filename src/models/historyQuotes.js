import { merge, memoize } from 'lodash-es';
import { fetchHistoryQuotes } from '../apis';
import { lastTradeDay } from '../time';

function getLastTradeDay(daysBefore) {
  let tradeDay = new Date();
  Array.from({ length: daysBefore }).forEach(() => {
    tradeDay = lastTradeDay(tradeDay);
  });
  return tradeDay;
}

function toDateString(date) {
  return date.toISOString().substr(0, 10);
}

export default {
  state: {
    // [stockCode]: {
    //   '2018-11-01': {
    //     openAt:
    //     closeAt:
    //     lowestAt:
    //     highestAt:
    //   }
    // }
  },
  reducers: {
    add(state, payload) {
      const { stockCode, day, ...data } = payload;
      return merge({}, state, {
        [payload.stockCode]: {
          [toDateString(payload.day)]: data,
        },
      });
    },
  },
  effects: dispatch => ({
    async fetch(payload) {
      const day = getLastTradeDay(payload.lookBackDays);
      const quotes = await fetchHistoryQuotes(payload.stockCodes, day);
      return Promise.all(quotes.map(quote => dispatch.historyQuotes.add({ ...quote, day })));
    },
  }),
  selectors: (slice, createSelector, hasProps) => ({
    get() {
      // return all groups as an array
      return createSelector(
        slice,
        state => memoize((stockCode, day) => (state[stockCode] || {})[toDateString(day)]),
      );
    },
  }),
};
