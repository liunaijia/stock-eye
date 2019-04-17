import { isEqual } from 'lodash-es';

/* eslint-disable @typescript-eslint/no-explicit-any */
function withCache<T extends Function>(fn: T): T {
  const cache: [any[], any][] = [];

  function get(key: any[]): any {
    const [, valueInCache] = cache.find(
      ([keyInCache]): boolean => isEqual(key, keyInCache),
    ) || [undefined, undefined];
    return valueInCache;
  }

  function set(key: any[], value: any): void {
    cache.push([key, value]);
  }

  // eslint-disable-next-line func-names
  return function (...args: any[]): T {
    const valueInCache = get(args);
    if (valueInCache) {
      return valueInCache;
    }

    const value = fn.apply(this, args);
    set(args, value);
    return value;
  } as any;
}
/* eslint-enable */

export async function fetchCurrentQuotes(stockCodes: string[]): Promise<JSON> {
  const apiEndpoint = 'https://w68lqh1j90.execute-api.ap-southeast-2.amazonaws.com/prod/current_quotes';
  const response = await fetch(`${apiEndpoint}?stockCodes=${stockCodes.join(',')}`);
  return response.json();
}

export const fetchHistoryQuote = withCache(
  async (stockCode: string, tradeDay: Date): Promise<JSON> => {
    const date = tradeDay.toISOString().substring(0, 10);
    const apiEndpoint = 'https://w68lqh1j90.execute-api.ap-southeast-2.amazonaws.com/prod/history_quotes';
    const url = `${apiEndpoint}?stockCode=${stockCode}&date=${date}`;
    const response = await fetch(url);
    return response.json();
  },
);
