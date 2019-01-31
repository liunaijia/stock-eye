import { classNames } from './util';

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
