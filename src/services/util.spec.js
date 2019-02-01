import { classNames, keyBy } from './util';

describe('classNames', () => {
  it('generates className from arguments', () => {
    const className = classNames('a', 'b');
    expect(className).toBe('a b');
  });

  it('ignores blank string in arguments', () => {
    const className = classNames('a', '', ' ', null, undefined, 'c');
    expect(className).toBe('a c');
  });
});

describe('keyBy', () => {
  it('creates an object composed of keys transformed from the results of accessing each item of array via given key', () => {
    const array = [
      { dir: 'left', code: 97 },
      { dir: 'right', code: 100 },
    ];
    expect(keyBy(array, 'dir')).toEqual({ left: { dir: 'left', code: 97 }, right: { dir: 'right', code: 100 } });
  });
});
