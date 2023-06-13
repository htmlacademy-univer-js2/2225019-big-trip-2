import dayjs from 'dayjs';

const HOUR_MINUTES_COUNT = 60;
const TOTAL_DAY_MINUTES_COUNT = 1440;
const DATE_FORMAT = 'YYYY-MM-DD';
const DATE_TIME_FORMAT = 'DD/MM/YY hh:mm';
const TIME_FORMAT = 'hh:mm';

const getDays = (days) => days <= 0 ? '' : `${`${days}`.padStart(2, '0')}D`;

const getHours = (days, restHours) => (days <= 0 && restHours <= 0) ? '' : `${`${restHours}`.padStart(2, '0')}H`;

const getMinutes = (restMinutes) => `${`${restMinutes}`.padStart(2, '0')}M`;

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
const isPointDatePast = (dateTo) => dayjs().diff(dateTo, 'minute') > 0;

const isPointDateFuture = (dateFrom) => dayjs().diff(dateFrom, 'minute') <= 0;

const isPointDate = (dateFrom, dateTo) => dayjs().diff(dateFrom, 'minute') > 0 && dayjs().diff(dateTo, 'minute') < 0;


export { ennoblePointDate, duration, getDate, getDateTime, getTime, isPointDatePast, isPointDateFuture,
  isPointDate };
