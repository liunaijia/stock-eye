import { isTradeTime, sleep } from './time';

describe('isTradeTime in Brisbane time zone', () => {
  it('is not trade time on Saturday', () => {
    const aSaturday = new Date('2017-8-19');
    Array.from({ length: 24 }).forEach((_, hour) => {
      aSaturday.setHours(hour);
      expect(isTradeTime(aSaturday)).toBe(false);
    });
  });

  it('is not trade time on Sunday', () => {
    const aSunday = new Date('2017-8-20');
    Array.from({ length: 24 }).forEach((_, hour) => {
      aSunday.setHours(hour);
      expect(isTradeTime(aSunday)).toBe(false);
    });
  });

  it('is not trade time at Monday 11:00', () => {
    const time = new Date('2017-8-14 11:00');
    expect(isTradeTime(time)).toBe(false);
  });

  it('is trade time at Monday 11:15', () => {
    const time = new Date('2017-8-14 11:15');
    expect(isTradeTime(time)).toBe(true);
  });

  it('is trade time at Monday 13:30', () => {
    const time = new Date('2017-8-14 13:30');
    expect(isTradeTime(time)).toBe(true);
  });

  it('is not trade time at Monday 14:00', () => {
    const time = new Date('2017-8-14 14:00');
    expect(isTradeTime(time)).toBe(false);
  });

  it('is trade time at Monday 15:00', () => {
    const time = new Date('2017-8-14 15:00');
    expect(isTradeTime(time)).toBe(true);
  });

  it('is trade time at Monday 17:00', () => {
    const time = new Date('2017-8-14 17:00');
    expect(isTradeTime(time)).toBe(true);
  });

  it('is not trade time after Monday 17:00', () => {
    const time = new Date('2017-8-14 17:00');
    Array.from({ length: 6 }).forEach((_, hour) => {
      time.setHours(17 + hour);
      Array.from({ length: 59 }).forEach((__, minute) => {
        time.setMinutes(1 + minute);
        expect(isTradeTime(time)).toBe(false);
      });
    });
  });

  it('is not trade time for public holidays', () => {
    const time = new Date('2017-10-2 12:00');
    expect(isTradeTime(time)).toBe(false);
  });
});

describe('sleep', () => {
  jest.useFakeTimers();

  it('waits 1 second before waking up', () => {
    sleep(1);

    expect(setTimeout.mock.calls.length).toBe(1);
    expect(setTimeout.mock.calls[0][1]).toBe(1000);
  });
});

