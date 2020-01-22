const totalMinutes = (hour, minute) => ((parseInt(hour, 10) * 60) + parseInt(minute, 10));

const isTimeInAnyTimeSlots = (timeInMinutes, ...timeSlots) => timeSlots.some((slot) => {
  const [, ...durations] = slot.match(/(\d+):(\d+)-(\d+):(\d+)/) || [];
  return timeInMinutes >= totalMinutes(durations[0], durations[1])
      && timeInMinutes <= totalMinutes(durations[2], durations[3]);
});

const publicHolidays = [
  '2017-10-2',
  '2017-10-3',
  '2017-10-4',
  '2017-10-5',
  '2017-10-6',
  '2019-2-4',
  '2019-2-5',
  '2019-2-6',
  '2019-2-7',
  '2019-2-8',
  '2019-4-5',
  '2019-5-1',
  '2019-5-2',
  '2019-5-3',
  '2020-1-1',
  '2020-1-24',
  '2020-1-27',
  '2020-1-28',
  '2020-1-29',
  '2020-1-30',
].map((day) => new Date(day));

const isTradeDay = (time) => {
  const day = time.getDay();
  const isWeekend = day === 0 || day === 6;
  if (isWeekend) { return false; }

  const onTheSameDay = (date1, date2) => date1.getFullYear() === date2.getFullYear()
    && date1.getMonth() === date2.getMonth()
    && date1.getDate() === date2.getDate();

  const isPublicHoliday = publicHolidays.some((publicHoliday) => onTheSameDay(publicHoliday, time));
  return !isPublicHoliday;
};

export const isTradeTime = (time = new Date()) => {
  if (!isTradeDay(time)) { return false; }

  const timeInMinutes = totalMinutes(time.getHours(), time.getMinutes());
  return isTimeInAnyTimeSlots(timeInMinutes, '11:15-13:30', '15:00-17:00');
};

export const sleep = async (seconds) => new Promise((resolve) => setTimeout(resolve, seconds * 1000));

export const lastTradeDay = (untilDay = new Date()) => {
  const time = untilDay;
  do {
    time.setDate(time.getDate() - 1);
  } while (!isTradeDay(time));
  return time;
};
