import { merge, memoize } from 'lodash-es';
import { fetchHistoryQuote } from '../apis';
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
      return Promise.all(
        payload.stockCodes.map(async (stockCode) => {
          const quote = await fetchHistoryQuote(stockCode, day);
          return dispatch.historyQuotes.add({ ...quote, day });
        }),
      );
    },
  }),
  selectors: (slice, createSelector, hasProps) => ({
    self() {
      return slice;
    },
    getBy() {
      // return all groups as an array
      return createSelector(
        this.self,
        state => memoize(
          (stockCode, lookBackDays) => {
            const day = getLastTradeDay(lookBackDays);
            return Object.freeze((state[stockCode] || {})[toDateString(day)]);
          },
        ),
      );
    },
  }),
};
