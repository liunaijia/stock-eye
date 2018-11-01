export default {
  state: {},
  reducers: {
    // handle state changes with pure functions
    add(state, payload) {
      return { ...state, [payload.id]: payload };
    },
  },
  effects: dispatch => ({
    // handle state changes with impure functions.
    // use async/await for async actions
    async incrementAsync(payload, rootState) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      dispatch.groups.add(payload);
    },
  }),
  selectors: (slice, createSelector, hasProps) => ({
    stockCodes() {
      // return all stock codes from all groups
      return slice(
        groups => Object.values(groups)
          .reduce((all, group) => all.concat(group.stocks), []),
      );
    },
    lookBackDaysOfStocks() {
      // return result like {sh601398: 2, sh601988: 1}
      return slice(groups => Object.values(groups).reduce((all, group) => {
        group.stocks.forEach((stockCode) => {
          Object.assign(all, { [stockCode]: group.lookBackDays });
        });
        return all;
      }, {}));
    },
  }),
};
