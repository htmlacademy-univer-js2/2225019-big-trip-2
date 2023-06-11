import { render } from './framework/render.js';
import { generateFilter } from './mock/mock-filter.js';
import { getPoints, getDestinations, getOffersByType } from './mock/point.js';
import FiltersView from './view/filters-view.js';
import TripEventsPresenter from './presenter/trip-events-presenter.js';
import MenuView from './view/menu-view.js';
import PointsModel from './model/points-model.js';

const siteHeaderElement = document.querySelector('.trip-main');
const siteMainElement = document.querySelector('.page-main');
const tripPresenter = new TripEventsPresenter(siteMainElement.querySelector('.trip-events'));

const points = getPoints();
const offersByType = getOffersByType();
const destinations = getDestinations();

const pointsModel = new PointsModel();
pointsModel.init(points, destinations, offersByType);
tripPresenter.init(pointsModel);

const filters = generateFilter(pointsModel.points);

render(new FiltersView({filters}), siteHeaderElement.querySelector('.trip-controls__filters'));
render(new SiteMenuView(), siteHeaderElement.querySelector('.trip-controls__navigation'));
