import { ApisauceInstance } from 'apisauce';
import MockAdapter from 'axios-mock-adapter';

import { HttpService } from '../HttpService';

const baseUrl = 'http://localhost:3000';

interface HttpServiceWithPrivates extends Omit<HttpService, 'apiSauce' | 'apiSauceWithoutAuth'> {
  apiSauce: ApisauceInstance;
  apiSauceWithoutAuth: ApisauceInstance;
}

describe('HTTP Service', () => {
  const mockGetAccessTokenCallBack = jest.fn();
  const mockGetRefreshTokenCallBack = jest.fn();
  const mockOnTokenUpdateCallBack = jest.fn();

  const getHttpService = () => {
    return new HttpService(
      baseUrl,
      mockGetAccessTokenCallBack,
      mockGetRefreshTokenCallBack,
      mockOnTokenUpdateCallBack,
    ) as unknown as HttpServiceWithPrivates;
  };

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

    await httpService.getAnonymous('/sample');
  });

  //TODO::add other unit tests once the APIs are ready
});
