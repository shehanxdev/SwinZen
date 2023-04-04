import { ApisauceInstance } from 'apisauce';
import MockAdapter from 'axios-mock-adapter';

import { GetAccessTokenCallback, GetRefreshTokenCallback, HttpService, OnTokenUpdateHandler } from '../HttpService';

const INITIAL_TOKENS = ['INITIAL_AUTH', 'INITIAL_REFRESH'];

const baseUrl = 'http://localhost:3000';

const noop = () => null;

interface HttpServiceWithPrivates extends Omit<HttpService, 'apiSauce' | 'apiSauceWithoutAuth'> {
  apiSauce: ApisauceInstance;
  apiSauceWithoutAuth: ApisauceInstance;
}

const getHttpService = ({
  getAccessToken,
  getRefreshToken,
  onTokenUpdate,
}: Partial<{
  getAccessToken: GetAccessTokenCallback;
  getRefreshToken: GetRefreshTokenCallback;
  onTokenUpdate: OnTokenUpdateHandler;
}> = {}) => {
  return new HttpService(
    baseUrl,
    getAccessToken || (() => INITIAL_TOKENS[0]),
    getRefreshToken || (() => INITIAL_TOKENS[1]),
    onTokenUpdate || noop,
  ) as unknown as HttpServiceWithPrivates;
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

    await httpService.getAnonymous('/sample');
  });

  it('should automatically add JWT auth token to authenticated requests', async () => {
    const httpService = getHttpService();

    const mock = new MockAdapter(httpService.apiSauce.axiosInstance, {
      delayResponse: 100,
    });

    mock.onAny().reply(config => {
      const authorizationHeader = config.headers.Authorization;
      expect(authorizationHeader).toBe(`Bearer ${INITIAL_TOKENS[0]}`);
      return [200];
    });

    await httpService.get('/sample');
  });

  it('should prepend base url to requests', async () => {
    const httpService = getHttpService();

    const mock = new MockAdapter(httpService.apiSauce.axiosInstance, {
      delayResponse: 100,
    });

    mock.onAny().reply(config => {
      expect(config.baseURL).toBe(baseUrl);
      return [200];
    });

    await httpService.get('/sample');
  });

  //TODO::Add unit tests related to token expired scenario after the refresh token logic get implemented
});
