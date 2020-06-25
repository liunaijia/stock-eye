import {
  fromTimezone, toTimezone, formatDate, formatDateTime,
} from './timeHelper';

describe('fromTimezone', () => {
  it('changes timezone', () => {
    const result = fromTimezone('2019-4-26 9:30');
    expect(result).toEqual(new Date(Date.parse('2019-4-26 7:30')));
  });
});

describe('toTimezone', () => {
  it('changes timezone', () => {
    const result = toTimezone('2019-4-26 7:30');
    expect(result).toEqual(new Date(Date.parse('2019-4-26 9:30')));
  });
});

describe('formatDate', () => {
  it('returns year, month and date', () => {
    const result = formatDate('2019-4-1 8:00');
    expect(result).toBe('2019-04-01');
  });
});

describe('formatDateTime', () => {
  it('returns year, month and date', () => {
    const result = formatDateTime('2019-4-1 8:01:30');
    expect(result).toBe('2019-04-01 08:01:30');
  });
});
