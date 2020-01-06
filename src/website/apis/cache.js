// @flow
import { isEqual } from 'lodash-es';

export function withCache(fn: Function): Function {
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
  return function (...args) {
    const valueInCache = get(args);
    if (valueInCache) {
      return valueInCache;
    }

    const value = fn.apply(this, args);
    set(args, value);
    return value;
  };
}
/* eslint-enable */
