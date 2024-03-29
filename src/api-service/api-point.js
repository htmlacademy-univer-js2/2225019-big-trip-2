import ApiService from '../framework/api-service.js';
import { ApiServiceResponseMethod } from '../constant.js';

export default class ApiPoint extends ApiService {
  get points() {
    return this._load({url: 'points'})
      .then(ApiService.parseResponse);
  }

  addPoint = async (point) => {
    const response = await this._load({
      url: 'points',
      method: ApiServiceResponseMethod.POST,
      body: JSON.stringify(this.#adaptToServer(point)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedLine = await ApiService.parseResponse(response);

    return parsedLine;
  };

  deletePoint = async (point) => {
    const response = await this._load({
      url: `points/${point.id}`,
      method: ApiServiceResponseMethod.DELETE,
    });

    return response;
  };

  updatePoint = async (point) => {
    const response = await this._load({
      url: `points/${point.id}`,
      method: ApiServiceResponseMethod.PUT,
      body: JSON.stringify(this.#adaptToServer(point)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedLine = await ApiService.parseResponse(response);

    return parsedLine;
  };

  #adaptToServer = (point) => {
    const adaptedPoint = {...point,
      'base_price': point.basePrice,
      'date_from': point.dateFrom instanceof Date ? point.dateFrom.toISOString() : null,
      'date_to': point.dateTo instanceof Date ? point.dateTo.toISOString() : null,
      'is_favorite': point.isFavorite,
    };

    delete adaptedPoint.basePrice;
    delete adaptedPoint.dateFrom;
    delete adaptedPoint.dateTo;
    delete adaptedPoint.isFavorite;

    return adaptedPoint;
  };
}
