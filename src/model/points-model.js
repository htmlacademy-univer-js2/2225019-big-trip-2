import Observable from '../framework/observable.js';

export default class PointsModel extends Observable {
  #points = null;
  #offers = null;
  #destinations = null;

  init(points, destinations, offers) {
    this.#points = points;
    this.#offers = offers;
    this.#destinations = destinations;
  }

  get points() {
    return this.#points;
  }

  get offers() {
    return this.#offers;
  }

  get destinations() {
    return this.#destinations;
  }

  addPoint = (updateThing, update) => {
    this.#points = [
      update,
      ...this.#points,
    ];

    this._notify(updateThing, update);
  };

  updatePoint = (updateThing, update) => {
    const index = this.#points.findIndex((point) => point.id === update.id);
    if (index === -1) {
      throw new Error('Can\'t update unexisting task');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      update,
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateThing, update);
  };

  deletePoint = (updateThing, update) => {
    const index = this.#points.findIndex((point) => point.id === update.id);
    if (index === -1) {
      throw new Error('Can\'t delete unexisting task');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateThing);
  };
}
