type Datelike = string | number | Date;

function isString(date: Datelike): date is string {
  return typeof date === 'string';
}

function isNumber(date: Datelike): date is number {
  return typeof date === 'number';
}

function parseDateString(date: string) : Date {
  return new Date(Date.parse(date));
}

function parseDateNumber(date: number): Date {
  return new Date(date);
}

function toDate(date: Datelike): Date {
  if (isString(date)) {
    return parseDateString(date);
  }
  if (isNumber(date)) {
    return parseDateNumber(date);
  }
  return date;
}

function changeTimezone(date: Datelike, direction: 1 | -1, foreignTimezoneOffset: number): Date {
  const localTimezoneOffset = new Date().getTimezoneOffset();
  const value = toDate(date).getTime();

  return new Date(value + direction * (foreignTimezoneOffset - localTimezoneOffset) * 60 * 1000);
}

// -480 is the offset of Beijing Timezone
export function fromTimezone(foreignValue: Datelike, foreignTimezoneOffset = -480): Date {
  return changeTimezone(foreignValue, -1, foreignTimezoneOffset);
}

export function toTimezone(localValue: Datelike, foreignTimezoneOffset = -480): Date {
  return changeTimezone(localValue, 1, foreignTimezoneOffset);
}

function pad(value: number): string {
  return value < 10 ? `0${value}` : `${value}`;
}

export function formatDate(date: Datelike): string {
  const value = toDate(date);
  return `${
    value.getFullYear()}-${
    pad(value.getMonth() + 1)}-${
    pad(value.getDate())}`;
}

export function formatDateTime(date: Datelike): string {
  const value = toDate(date);
  return `${
    formatDate(value)} ${
    pad(value.getHours())}:${
    pad(value.getMinutes())}:${
    pad(value.getSeconds())}`;
}
