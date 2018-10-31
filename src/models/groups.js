export default {
  state: {},
  reducers: {
    // handle state changes with pure functions
    add(state, payload) {
      return { ...state, [payload.name]: payload };
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
};
