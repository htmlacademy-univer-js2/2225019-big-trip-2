import MenuView from './view/menu-view.js';
import FiltersView from './view/filters-view.js';
import { render } from './render.js';
import EventsPresenter from './presenter/events-presenter.js';

const pageHeader = document.querySelector('.page-header');
const pageMain = document.querySelector('.page-main');
const menuElement = pageHeader.querySelector('.trip-controls__navigation');
const filterElement = pageHeader.querySelector('.trip-controls__filters');
const tripEvents = pageMain.querySelector('.trip-events');

render(new MenuView(), menuElement);
render(new FiltersView(), filterElement);

const tripPresenter = new EventsPresenter();

tripPresenter.init(tripEvents);
