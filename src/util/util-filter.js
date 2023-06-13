import { isPointDateFuture, isPointDatePast, isPointDate } from './date-point.js';
import { FilterIt } from '../constant.js';

const filter = {
  [FilterIt.EVERYTHING]: (points) => points,
  [FilterIt.FUTURE]: (points) => points.filter((point) => isPointDateFuture(point.dateFrom)
    || isPointDate(point.dateFrom, point.dateTo)),
  [FilterIt.PAST]: (points) => points.filter((point) => isPointDatePast(point.dateTo)
    || isPointDate(point.dateFrom, point.dateTo)),
};

export { filter };
