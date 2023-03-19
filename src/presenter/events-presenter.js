import EditingFormView from '../view/editing-form-view.js';
import TripEventsView from '../view/trip-events-view.js';
import SortingView from '../view/sorting-view.js';
import TripPointView from '../view/trip-point-view.js';
import { render } from '../render.js';

export default class EventsPresenter {
  init (eventsContainer) {
    this.tripEventsContainer = eventsContainer;
    render(new SortingView(), this.tripEventsContainer);
    render(new TripEventsView(), this.tripEventsContainer);
    const eventsList = eventsContainer.querySelector('.trip-events__list');
    render(new EditingFormView(), eventsList);

    for (let i = 0; i < 3; i++) {
      render(new TripPointView, eventsList);
    }
  }
}
