import http from 'http';
import https from 'https';
import { get } from './httpHelper';

jest.mock('http', () => {
  let getCallback;
  let errorCallback;
  const mock = jest.fn((url, callback) => {
    getCallback = callback;
    return {
      on(event, onCallback) {
        if (event === 'error') {
          errorCallback = onCallback;
        }
        return this;
      },
      end: jest.fn(),
    };
  });
  mock.resolve = (...args) => getCallback(...args);
  mock.reject = (...args) => errorCallback(...args);

  return {
    request: mock,
  };
});

jest.mock('https', () => ({
  request: jest.fn().mockReturnValue({
    on: jest.fn().mockReturnThis(),
    end: jest.fn(),
  }),
}));

describe('get', () => {
  beforeAll(() => {
    // eslint-disable-next-line no-console
    console.log = jest.fn();
  });

  it('sends http request', async () => {
    get('http://my.com');
    expect(http.request).toBeCalledWith('http://my.com', expect.any(Function));
  });

  it('resolves response', async () => {
    const getPromise = get('http://my.com');

    const response = { statusCode: 200 };
    http.request.resolve(response);
    expect(await getPromise).toBe(response);
    // eslint-disable-next-line no-console
    expect(console.log).toBeCalledWith('200 - GET http://my.com');
  });

  it('rejects response', async () => {
    expect.assertions(1);

    const getPromise = get('http://my.com');

    const error = new Error();
    http.request.reject(error);

    try {
      await getPromise;
    } catch (e) {
      expect(e).toBe(error);
    }
  });

  it('sends https request', async () => {
    get('https://my.com');
    expect(https.request).toBeCalledWith('https://my.com', expect.any(Function));
  });
});
