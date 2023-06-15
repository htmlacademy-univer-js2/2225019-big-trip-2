import dayjs from 'dayjs';
import { SortType } from '../constant';

const daySortPoint = (pointA, pointB) => dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));

const priceSortPoint = (pointA, pointB) => pointB.basePrice - pointA.basePrice;

const timeSortPoint = (pointA, pointB) => {
  const timePointA = dayjs(pointA.dateTo).diff(dayjs(pointA.dateFrom));
  const timePointB = dayjs(pointB.dateTo).diff(dayjs(pointB.dateFrom));
  return timePointB - timePointA;
};

const doSort = {
  [SortType.DAY]: (points) => points.sort(daySortPoint),
  [SortType.PRICE]: (points) => points.sort(priceSortPoint),
  [SortType.TIME]: (points) => points.sort(timeSortPoint),
};

export { doSort };
