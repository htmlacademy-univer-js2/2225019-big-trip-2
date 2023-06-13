import ApiService from '../framework/api-service.js';
import { ApiServiceResponseMethod } from '../constant.js';

export default class ApiOffer extends ApiService {
  get offers() {
    return this._load({url: 'offers'})
      .then(ApiService.parseResponse);
  }

  updateOffer = async (offer) => {
    const response = await this._load({
      url: `offers/${offer.type}`,
      method: ApiServiceResponseMethod.PUT,
      body: JSON.stringify(offer),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedLine = await ApiService.parseResponse(response);

    return parsedLine;
  };
}
