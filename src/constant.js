//const SORT_TYPES_DISABLED = ['event', 'offer'];
const AUTHORIZATION = 'Basic jsggfgdidbdj789';
const END_POINT = 'https://18.ecmascript.pages.academy/big-trip';

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT'
};

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past'
};

const SortType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFER: 'offer',
};

const SortTypeDescription = {
  [SortType.DAY]: 'Day',
  [SortType.EVENT]: 'Event',
  [SortType.TIME]: 'Time',
  [SortType.PRICE]: 'Price',
  [SortType.OFFER]: 'Offer',
};

const PointType = {
  TAXI: 'taxi',
  BUS: 'bus',
  DRIVE: 'drive',
  FLIGHT: 'flight',
  TRAIN: 'train',
  SHIP: 'ship',
  SIGHTSEEING: 'sightseeing',
  RESTAURANT: 'restaurant',
  CHECK_IN: 'check-in',
};

const PointTypeDescription = {
  [PointType.TAXI]: 'Taxi',
  [PointType.BUS]: 'Bus',
  [PointType.TRAIN]: 'Train',
  [PointType.SHIP]: 'Ship',
  [PointType.DRIVE]: 'Drive',
  [PointType.FLIGHT]: 'Flight',
  [PointType.RESTAURANT]: 'Restaurant',
  [PointType.SIGHTSEEING]: 'Sightseeing',
  [PointType.CHECK_IN]: 'Check-in'
};

const ApiServiceResponseMethod = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE'
};

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

export { UserAction, UpdateType, FilterType, SortType, SortTypeDescription, PointType,
  PointTypeDescription, ApiServiceResponseMethod, AUTHORIZATION, END_POINT, TimeLimit };
