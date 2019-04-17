import { isEqual } from 'lodash-es';

/* eslint-disable @typescript-eslint/no-explicit-any */
export function withCache<T extends Function>(fn: T): T {
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
