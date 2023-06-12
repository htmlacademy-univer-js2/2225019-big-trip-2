import dayjs from 'dayjs';

const HOUR_MINUTES_COUNT = 60;
const TOTAL_DAY_MINUTES_COUNT = 1440;
const DATE_FORMAT = 'YYYY-MM-DD';
const DATE_TIME_FORMAT = 'DD/MM/YY hh:mm';
const TIME_FORMAT = 'hh:mm';

const getDays = (days) => {
  if (!days) {
    return '';
  }
  if (days < 10) {
    return `0${days}D`;
  }
  return `${days}D`;
};

const getHours = (days, restHours) => {
  if (!days && !restHours) {
    return '';
  }
  if(restHours < 10) {
    return `0${restHours}H`;
  }
  return `${restHours}H`;
};

const getMinutes = (restMinutes) => (restMinutes < 10) ? `0${restMinutes}M` : `${restMinutes}M`;

const duration = (dateFrom, dateTo) => {
  const start = dayjs(dateFrom);
  const end = dayjs(dateTo);
  const difference = end.diff(start, 'minute');
  const day = Math.floor(difference / TOTAL_DAY_MINUTES_COUNT);
  const restHours = Math.floor((difference - day * TOTAL_DAY_MINUTES_COUNT) / HOUR_MINUTES_COUNT);
  const restMinutes = difference - (day * TOTAL_DAY_MINUTES_COUNT + restHours * HOUR_MINUTES_COUNT);
  const daysOutput = getDays(day);
  const hoursOutput = getHours(day, restHours);
  const minutesOutput = getMinutes(restMinutes);

  return `${daysOutput} ${hoursOutput} ${minutesOutput}`;
};

const ennoblePointDate = (date) => dayjs(date).format('DD MMM');
const getDate = (date) => dayjs(date).format(DATE_FORMAT);
const getTime = (date) => dayjs(date).format(TIME_FORMAT);
const getDateTime = (date) => dayjs(date).format(DATE_TIME_FORMAT);
const isPointDatePast = (date) => dayjs().diff(date, 'day') > 0;
const isPointDateFuture = (date) => date.diff(dayjs(), 'day') >= 0;
const isPointDate = (dateFrom, dateTo) => dayjs().diff(dateFrom, 'day') > 0 && dateTo.diff(dayjs(), 'day') > 0;

export { ennoblePointDate, duration, getDate, getDateTime, getTime, isPointDatePast, isPointDateFuture,
  isPointDate };
