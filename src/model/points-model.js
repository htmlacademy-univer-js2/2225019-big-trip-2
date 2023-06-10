export default class PointsModel {
  #points = null;
  #offers = null;
  #destinations = null;

  constructor() {
    this.#points = [];
  }

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
}
