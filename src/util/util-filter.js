import { isPointDateFuture, isPointDatePast, isPointDate } from './date-point.js';
import { FilterType } from '../constant.js';

const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => isPointDateFuture(point.dateFrom)
    || isPointDate(point.dateFrom, point.dateTo)),
  [FilterType.PAST]: (points) => points.filter((point) => isPointDatePast(point.dateTo)
    || isPointDate(point.dateFrom, point.dateTo)),
};

export { filter };
