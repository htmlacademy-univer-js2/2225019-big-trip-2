import AbstractView from '../framework/view/abstract-view.js';
import { Sorting } from '../util/sort-type.js';

const createSortingTemplate = () => (
  `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
  <div class="trip-sort__item  trip-sort__item--${Sorting.DAY}">
    <input data-sort-type=${Sorting.DAY} id="sort-${Sorting.DAY}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${Sorting.DAY}" checked>
    <label class="trip-sort__btn" for="sort-${Sorting.DAY}">Day</label>
  </div>

  <div class="trip-sort__item  trip-sort__item--${Sorting.EVENT}">
    <input data-sort-type=${Sorting.EVENT} id="sort-${Sorting.EVENT}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${Sorting.EVENT}" disabled>
    <label class="trip-sort__btn" for="sort-${Sorting.EVENT}">Event</label>
  </div>

  <div class="trip-sort__item  trip-sort__item--${Sorting.TIME}">
    <input data-sort-type=${Sorting.TIME} id="sort-${Sorting.TIME}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${Sorting.TIME}">
    <label class="trip-sort__btn" for="sort-${Sorting.TIME}">Time</label>
  </div>

  <div class="trip-sort__item  trip-sort__item--${Sorting.PRICE}">
    <input data-sort-type=${Sorting.PRICE} id="sort-${Sorting.PRICE}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${Sorting.PRICE}">
    <label class="trip-sort__btn" for="sort-${Sorting.PRICE}">Price</label>
  </div>

  <div class="trip-sort__item  trip-sort__item--${Sorting.OFFER}">
    <input data-sort-type=${Sorting.OFFER} id="sort-${Sorting.OFFER}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${Sorting.OFFER}" disabled>
    <label class="trip-sort__btn" for="sort-${Sorting.OFFER}">Offers</label>
  </div>
</form>`
);

export default class SortingView extends AbstractView {
  get template () {
    return createSortingTemplate();
  }

  setSortingChangeHandler = (callback) => {
    this._callback.sortingChange = callback;
    this.element.addEventListener('click', this.#sortingChangeHandler);
  };

  #sortingChangeHandler = (evt) => {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }
    evt.preventDefault();
    this._callback.sortingChange(evt.target.dataset.sorting);
  };
}
