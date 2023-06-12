import dayjs from 'dayjs';

const Sorting = {
  DAY: 'day',
  TIME: 'time',
  PRICE: 'price',
  OFFER: 'offer',
  EVENT: 'event'
};

const sortDayPoint = (pointA, pointB) => dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));

const sortTimePoint = (pointA, pointB) => {
  const timePointA = dayjs(pointA.dateTo).diff(dayjs(pointA.dateFrom));
  const timePointB = dayjs(pointB.dateTo).diff(dayjs(pointB.dateFrom));
  return timePointB - timePointA;
};

const sortPricePoint = (pointA, pointB) => pointB.basePrice - pointA.basePrice;

const sortType = {
  [Sorting.DAY]: (points) => points.sort(sortDayPoint),
  [Sorting.TIME]: (points) => points.sort(sortTimePoint),
  [Sorting.PRICE]: (points) => points.sort(sortPricePoint)
};

export { Sorting, sortType };

