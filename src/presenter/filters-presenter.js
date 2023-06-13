import FilterView from '../view/filters-view.js';
import { render, replace, remove } from '../framework/render.js';
import { filter } from '../util/util-filter.js';
import { FilterIt, UpdateIt } from '../constant.js';

export default class FilterPresenter {
  #filterBox = null;
  #filterModel = null;
  #pointsModel = null;

  #filterComponent = null;

  constructor(filterBox, filterModel, pointsModel) {
    this.#filterBox = filterBox;
    this.#filterModel = filterModel;
    this.#pointsModel = pointsModel;
    this.#pointsModel.addObserver(this.#handModelEvent);
    this.#filterModel.addObserver(this.#handModelEvent);
  }

  #handModelEvent = () => {
    this.init();
  };

  get filters() {
    const points = this.#pointsModel.points;

    return [
      {
        type: FilterIt.EVERYTHING,
        name: 'EVERYTHING',
        count: filter[FilterIt.EVERYTHING](points).length,
      },
      {
        type: FilterIt.PAST,
        name: 'PAST',
        count: filter[FilterIt.PAST](points).length,
      },
      {
        type: FilterIt.FUTURE,
        name: 'FUTURE',
        count: filter[FilterIt.FUTURE](points).length,
      },
    ];
  }

  init = () => {
    const filters = this.filters;
    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new FilterView(filters, this.#filterModel.filter);
    this.#filterComponent.setFilterTypeChange(this.#handFilterTypeChange);

    if (prevFilterComponent === null) {
      render(this.#filterComponent, this.#filterBox);
      return;
    }
    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  };

  #handFilterTypeChange = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }

    this.#filterModel.setFilter(UpdateIt.MAJOR, filterType);
  };
}
