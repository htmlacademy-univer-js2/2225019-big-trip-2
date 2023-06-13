import dayjs from 'dayjs';
import { SortIt } from '../constant';

const daySortPoint = (pointA, pointB) => dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));

const priceSortPoint = (pointA, pointB) => pointB.basePrice - pointA.basePrice;

const timeSortPoint = (pointA, pointB) => {
  const timePointA = dayjs(pointA.dateTo).diff(dayjs(pointA.dateFrom));
  const timePointB = dayjs(pointB.dateTo).diff(dayjs(pointB.dateFrom));
  return timePointB - timePointA;
};

const doSort = {
  [SortIt.DAY]: (points) => points.sort(daySortPoint),
  [SortIt.PRICE]: (points) => points.sort(priceSortPoint),
  [SortIt.TIME]: (points) => points.sort(timeSortPoint),
};

export { doSort };

