import { render } from './framework/render.js';
import { generateFilter } from './mock/mock-filter.js';
import { getPoints, getDestinations, getOffersByType } from './mock/point.js';
import FiltersView from './view/filters-view.js';
import MenuView from './view/menu-view.js';
import PointsModel from './model/points-model.js';
import MainPresenter from './presenter/main-presenter.js';
import SubsidiaryPresenter from './presenter/subsidiary-presenter.js';

const siteHeaderElement = document.querySelector('.trip-main');
const siteMainElement = document.querySelector('.page-main');
//const tripPresenter = new TripEventsPresenter(siteMainElement.querySelector('.trip-events'));

const points = getPoints();
const destinations = getDestinations();
const offersByType = getOffersByType();
const filters = generateFilter(pointsModel.points);

const pointsModel = new PointsModel();
pointsModel.init(points, destinations, offersByType);
const mainPresenter = new MainPresenter(siteMainElement.querySelector('.trip-events'), pointsModel);
MainPresenter.init();

render(new FiltersView({filters}), siteHeaderElement.querySelector('.trip-controls__filters'));
render(new MenuView(), siteHeaderElement.querySelector('.trip-controls__navigation'));
