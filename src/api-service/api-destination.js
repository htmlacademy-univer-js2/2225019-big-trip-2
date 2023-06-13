import { ApiServiceResponseMethod } from '../constant.js';
import ApiService from '../framework/api-service.js';

export default class ApiDestination extends ApiService {
  get destinations() {
    return this._load({url: 'destinations'})
      .then(ApiService.parseResponse);
  }

  updateDest = async (destination) => {
    const response = await this._load({
      url: `destinations/${destination.id}`,
      method: ApiServiceResponseMethod.PUT,
      body: JSON.stringify(destination),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedLine = await ApiService.parseResponse(response);

    return parsedLine;
  };
}
