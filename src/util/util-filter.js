import { isPointDateFuture, isPointDatePast, isPointDate } from './date-point.js';

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past'
};

const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => isPointDateFuture(point.dateFrom)
    || isPointDate(point.dateFrom, point.dateTo)),
  [FilterType.PAST]: (points) => points.filter((point) => isPointDatePast(point.dateTo)
    || isPointDate(point.dateFrom, point.dateTo)),
};

export { filter };
