const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const SortIt = {
  EVENT: 'event',
  PRICE: 'price',
  OFFER: 'offer',
  DAY: 'day',
  TIME: 'time',
};

const FilterIt = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past'
};

const UpdateIt = {
  PATCH: 'PATCH',
  MAJOR: 'MAJOR',
  MINOR: 'MINOR',
};

export { UserAction, UpdateIt, FilterIt, SortIt };
