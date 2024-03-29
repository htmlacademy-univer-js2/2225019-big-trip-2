import { render } from './framework/render.js';
import MenuView from './view/menu-view.js';
import ApiDestination from './api-service/api-destination.js';
import ApiOffer from './api-service/api-offer.js';
import ApiPoint from './api-service/api-point.js';
import PointsModel from './model/points-model.js';
import OffersModel from './model/offers-model.js';
import FilterModel from './model/filter-model.js';
import DestinationsModel from './model/destination-model.js';
import FilterPresenter from './presenter/filters-presenter.js';
import BoardPresenter from './presenter/main-presenter.js';
import { END_POINT, AUTHORIZATION } from './constant.js';
import NewPointButtonPresenter from './presenter/button-new-point-presenter.js';

const siteHeaderElement = document.querySelector('.trip-main');
const siteMainElement = document.querySelector('.page-main');

const pointsModel = new PointsModel(new ApiPoint(END_POINT, AUTHORIZATION));
const destinationsModel = new DestinationsModel(new ApiDestination(END_POINT, AUTHORIZATION));
const offersModel = new OffersModel(new ApiOffer(END_POINT, AUTHORIZATION));

const filterModel = new FilterModel();
const filterPresenter = new FilterPresenter({
  filterContainer: siteHeaderElement.querySelector('.trip-controls__filters'),
  pointsModel: pointsModel,
  destinationsModel: destinationsModel,
  offersModel: offersModel,
  filterModel: filterModel
});
filterPresenter.init();

const boardPresenter = new BoardPresenter({
  tripInfoContainer: siteHeaderElement.querySelector('.trip-main__trip-info'),
  tripContainer: siteMainElement.querySelector('.trip-events'),
  pointsModel: pointsModel,
  filterModel: filterModel,
  destinationsModel: destinationsModel,
  offersModel: offersModel
});
boardPresenter.init();

const newPointButtonPresenter = new NewPointButtonPresenter({
  newPointButtonContainer: siteHeaderElement,
  destinationsModel: destinationsModel,
  pointsModel: pointsModel,
  offersModel: offersModel,
  boardPresenter: boardPresenter
});
newPointButtonPresenter.init();

offersModel.init().finally(() => {
  destinationsModel.init().finally(() => {
    pointsModel.init().finally(() => {
      newPointButtonPresenter.renderNewPointButton();
    });
  });
});

render(new MenuView(), siteHeaderElement.querySelector('.trip-controls__navigation'));
