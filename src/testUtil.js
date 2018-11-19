export const mockPromise = jest.fn(() => {
  let resolveFn;
  let rejectFn;

  const mock = jest.fn().mockReturnValue(new Promise((resolve, reject) => {
    resolveFn = resolve;
    rejectFn = reject;
  }));

  mock.resolve = value => resolveFn(value);
  mock.reject = reason => rejectFn(reason);
  return mock;
});
