// @flow
const totalMinutes = (hour: number | string, minute: number | string) =>
  ((parseInt(hour, 10) * 60) + parseInt(minute, 10));

const isTimeInAnyTimeSlots = (timeInMinutes: number, ...timeSlots) =>
  timeSlots.some((slot) => {
    const [, ...durations] = slot.match(/(\d+):(\d+)-(\d+):(\d+)/) || [];
    return timeInMinutes >= totalMinutes(durations[0], durations[1]) &&
      timeInMinutes <= totalMinutes(durations[2], durations[3]);
  });

const isTradeDay = (time) => {
  const day = time.getDay();
  return day > 0 && day < 6;
};

const isTradeTime = (time: Date) => {
  if (!isTradeDay(time)) { return false; }

  const BEIJING_TIMEZONE = -480;
  const timezoneDiff = time.getTimezoneOffset() - BEIJING_TIMEZONE;
  const timeInMinutes = timezoneDiff + totalMinutes(time.getHours(), time.getMinutes());

  return isTimeInAnyTimeSlots(timeInMinutes, '9:30-11:30', '13:00-15:00');
};

export default isTradeTime;
