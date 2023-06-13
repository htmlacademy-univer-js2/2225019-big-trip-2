import Observable from '../framework/observable.js';
import { FilterIt } from '../constant.js';

export default class FilterModel extends Observable {
  #filter = FilterIt.EVERYTHING;

  get filter() {
    return this.#filter;
  }

  setFilter = (updateThing, filter) => {
    this.#filter = filter;
    this._notify(updateThing, filter);
  };
}
