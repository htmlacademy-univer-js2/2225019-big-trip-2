import { render } from './framework/render.js';
import { getPoints, getDestinations, getOffersByType } from './mock/point.js';
import MenuView from './view/menu-view.js';
import PointsModel from './model/points-model.js';
import MainPresenter from './presenter/main-presenter.js';
import ButtonNewPointView from './view/button-new-point-view.js';
import FilterModel from './model/filters-model.js';
import FilterPresenter from './presenter/filters-presenter.js';

const siteHeaderElement = document.querySelector('.trip-main');
const siteMainElement = document.querySelector('.page-main');


const points = getPoints();
const offersByType = getOffersByType();
const destinations = getDestinations();

const pointsModel = new PointsModel();
pointsModel.init(points, destinations, offersByType);

const filterModel = new FilterModel();
const filterPresenter = new FilterPresenter(siteHeaderElement.querySelector('.trip-controls__filters'), filterModel, pointsModel);
filterPresenter.init();

const mainPresenter = new MainPresenter(siteMainElement.querySelector('.trip-events'), pointsModel, filterModel);
mainPresenter.init();

const newPointButtonComponent = new ButtonNewPointView();

const handleNewPointFormClose = () => {
  newPointButtonComponent.element.disabled = false;
};

const handleNewPointButtonClick = () => {
  mainPresenter.createPoint(handleNewPointFormClose);
  newPointButtonComponent.element.disabled = true;
};

render(newPointButtonComponent, siteHeaderElement);
newPointButtonComponent.setClickHandler(handleNewPointButtonClick);


render(new MenuView(), siteHeaderElement.querySelector('.trip-controls__navigation'));

