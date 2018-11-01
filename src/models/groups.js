export default {
  state: {
    // [id]: { ... }
  },
  reducers: {
    // handle state changes with pure functions
    add(state, payload) {
      return { ...state, [payload.id]: payload };
    },
  },
  effects: dispatch => ({
    // watch quotes for all stocks in all groups
    async watchQuotes(payload, rootState) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      dispatch.groups.add(payload);
    },
  }),
  selectors: (slice, createSelector, hasProps) => ({
    all() {
      // return all groups as an array
      return slice(
        groups => Object.values(groups),
      );
    },
    stockCodes() {
      // return all stock codes from all groups
      return slice(
        groups => Object.values(groups)
          .reduce((all, group) => all.concat(group.stocks), []),
      );
    },
  }),
};
