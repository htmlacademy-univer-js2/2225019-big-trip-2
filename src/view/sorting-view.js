import AbstractView from '../framework/view/abstract-view.js';
import { SortIt } from '../constant.js';

const createSortingTemplate = (currentSortType) => (
  `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
  <div class="trip-sort__item  trip-sort__item--${SortIt.DAY}">
    <input ${currentSortType === SortIt.DAY ? 'checked' : ''} data-sort-type=${SortIt.DAY}
    id="sort-${SortIt.DAY}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${SortIt.DAY}" checked>
    <label class="trip-sort__btn" for="sort-${SortIt.DAY}">Day</label>
  </div>

  <div class="trip-sort__item  trip-sort__item--${SortIt.EVENT}">
    <input ${currentSortType === SortIt.EVENT ? 'checked' : ''} data-sort-type=${SortIt.EVENT}
    id="sort-${SortIt.EVENT}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${SortIt.EVENT}" disabled>
    <label class="trip-sort__btn" for="sort-${SortIt.EVENT}">Event</label>
  </div>

  <div class="trip-sort__item  trip-sort__item--${SortIt.TIME}">
    <input ${currentSortType === SortIt.TIME ? 'checked' : ''} data-sort-type=${SortIt.TIME}
    id="sort-${SortIt.TIME}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${SortIt.TIME}">
    <label class="trip-sort__btn" for="sort-${SortIt.TIME}">Time</label>
  </div>

  <div class="trip-sort__item  trip-sort__item--${SortIt.PRICE}">
    <input ${currentSortType === SortIt.PRICE ? 'checked' : ''} data-sort-type=${SortIt.PRICE}
    id="sort-${SortIt.PRICE}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${SortIt.PRICE}">
    <label class="trip-sort__btn" for="sort-${SortIt.PRICE}">Price</label>
  </div>

  <div class="trip-sort__item  trip-sort__item--${SortIt.OFFER}">
    <input ${currentSortType === SortIt.OFFER ? 'checked' : ''} data-sort-type=${SortIt.OFFER}
    id="sort-${SortIt.OFFER}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${SortIt.OFFER}" disabled>
    <label class="trip-sort__btn" for="sort-${SortIt.OFFER}">Offers</label>
  </div>
</form>`
);

export default class SortingView extends AbstractView {
  #currentSortType = null;

  constructor(currentSortType) {
    super();
    this.#currentSortType = currentSortType;
  }

  get template () {
    return createSortingTemplate(this.#currentSortType);
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
