import { render, RenderPosition, remove } from '../framework/render.js';
import SortingView from '../view/sorting-view.js';
import NoPointView from '../view/no-point-view.js';
import TripEventsView from "../view/trip-point-view.js";
import SubsidiaryPresenter from "./subsidiary-presenter.js";
import PointNewPresenter from './new-point-presenter.js';
import { doSort } from '../util/sort-type.js';
import { filter } from '../util/util-filter.js';
import { UserAction, UpdateIt, SortIt, FilterIt } from '../constant.js';

//import { Sorting, sortType } from '../util/sort-type.js';
//import { updateItem } from '../util/common-elements.js';

export default class MainPresenter {
  #filterBox = null;
  #pointsModel = null;
  #filterModel = null;

  #noPointComponent = null;
  #sortComponent = null;
  #pointListComponent = new TripEventsView();

  #pointPresenter = new Map();
  #pointNewPresenter = null;
  #currentSortType = SortIt.DAY;
  #filterType = FilterIt.EVERYTHING;

  constructor(filterBox, pointsModel, filterModel) {
    this.#filterBox = filterBox;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;

    this.#pointNewPresenter = new PointNewPresenter(this.#pointListComponent.element, this.#handleViewAction, this.#pointsModel);

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = filter[this.#filterType](points);

    doSort[this.#currentSortType](filteredPoints);
    return filteredPoints;
  }

  init() {
    this.#renderBoard();
  }

  createPoint = (callback) => {
    this.#currentSortType = SortIt.DAY;
    this.#filterModel.setFilter(UpdateIt.MAJOR, FilterIt.EVERYTHING);
    this.#pointNewPresenter.init(callback);
  };

  #handleModeChange = () => {
    this.#pointNewPresenter.destroy();
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateIt.PATCH:
        this.#pointPresenter.get(data.id).init(data);
        break;
      case UpdateIt.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateIt.MAJOR:
        this.#clearBoard({resetSortType: true});
        this.#renderBoard();
        break;
    }
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearBoard();
    this.#renderBoard();
  };

  #renderSort = () => {
    this.#sortComponent = new SortingView(this.#currentSortType);
    this.#sortComponent.setSortingChangeHandler(this.#handleSortTypeChange);

    render(this.#sortComponent, this.#filterBox, RenderPosition.AFTERBEGIN);
  };

  #renderPoint = (point) => {
    const pointPresenter = new SubsidiaryPresenter(this.#pointListComponent.element, this.#pointsModel, this.#handleViewAction, this.#handleModeChange);
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  };

  #renderPoints = (points) => {
    points.forEach((point) => this.#renderPoint(point));
  };

  #renderNoPoints = () => {
    this.#noPointComponent = new NoPointView(this.#filterType);
    render(this.#noPointComponent, this.#filterBox, RenderPosition.AFTERBEGIN);
  };

  #renderPointList = () => {
    render(this.#pointListComponent, this.#filterBox);
    this.#renderPoints(this.points);
  };

  #clearBoard = ({resetSortType = false} = {}) => {
    this.#pointNewPresenter.destroy();
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();

    remove(this.#sortComponent);

    if (this.#noPointComponent) {
      remove(this.#noPointComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SortIt.DAY;
    }
  };

  #renderBoard = () => {
    const points = this.points;
    const pointCount = points.length;

    if (pointCount === 0) {
      this.#renderNoPoints();
      return;
    }
    this.#renderSort();
    this.#renderPointList();
  };
}

