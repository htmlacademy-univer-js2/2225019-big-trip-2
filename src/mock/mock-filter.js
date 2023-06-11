import {filter} from '../util/util-filter.js';

export const generateFilter = (points) => Object.entries(filter).map(
  ([filterName, filterPoints]) => ({
    name: filterName,
    count: filterPoints(points).length,
  }),
);
