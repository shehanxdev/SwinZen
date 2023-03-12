import { ApisauceInstance } from 'apisauce';
import MockAdapter from 'axios-mock-adapter';

import { HttpService } from '../HttpService';

const baseUrl = 'http://localhost:3000'; //TODO::update
const auth0RefreshTokenDnsUrl = 'http://localhost:3000'; //TODO::update
const auth0ClientId = 'NO_CLIENT_ID';

interface HttpServiceWithPrivates extends Omit<HttpService, 'apiSauce' | 'apiSauceWithoutAuth'> {
  apiSauce: ApisauceInstance;
  apiSauceWithoutAuth: ApisauceInstance;
}

const getHttpService = () => {
  return new HttpService(auth0RefreshTokenDnsUrl, auth0ClientId, baseUrl) as unknown as HttpServiceWithPrivates;
};

describe('HTTP Service', () => {
  it('should initialize when provided with correct params', () => {
    const httpService = getHttpService();
    expect(httpService).toBeInstanceOf(HttpService);
  });

  it('should not add JWT auth token to anonymous requests', async () => {
    const httpService = getHttpService();

    const mock = new MockAdapter(httpService.apiSauceWithoutAuth.axiosInstance, { delayResponse: 100 });

    mock.onAny().reply(config => {
      const authorizationHeader = config.headers.Authorization;
      expect(authorizationHeader).toBeUndefined();
      return [200];
    });

    await httpService.getAnonymous('/sample'); //TODO::replace with an actual end point
  });

  //TODO::add other unit tests once the APIs are ready
});
