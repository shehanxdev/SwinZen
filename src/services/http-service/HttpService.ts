import { ApiResponse, ApisauceInstance, create } from 'apisauce';

import { IS_JEST_RUNTIME } from '@sz/constants';

import { APIError } from './APIError';

type HttpVerbs = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type OnTokenUpdateHandler = (accessToken: string, refreshToken: string) => unknown;
export type GetAccessTokenCallback = () => string | null;
export type GetRefreshTokenCallback = () => string | null;

export class HttpService {
  // used to handle anonymous API calls
  private apiSauceWithoutAuth!: ApisauceInstance;

  // used to handle authenticated API calls
  private apiSauce!: ApisauceInstance;
  private apiSauceState: 'pending' | 'ready' = 'pending';

  // used to put requests on hold when tokens are being refreshed
  private waitingList: Array<() => void> = [];

  // passed as an argument in order to avoid issues with JEST runtime
  private baseUrl: string;

  private getAccessToken: GetAccessTokenCallback;
  private getRefreshToken: GetRefreshTokenCallback;
  private onTokenUpdate: OnTokenUpdateHandler;

  constructor(
    baseUrl: string,
    getAccessToken: GetAccessTokenCallback,
    getRefreshToken: GetRefreshTokenCallback,
    onTokenUpdate: OnTokenUpdateHandler,
  ) {
    this.baseUrl = baseUrl;
    this.initializeApiSauce();
    this.getAccessToken = getAccessToken;
    this.getRefreshToken = getRefreshToken;
    this.onTokenUpdate = onTokenUpdate;
  }

  private initializeApiSauce = () => {
    this.apiSauce = create({ baseURL: undefined });
    this.apiSauceWithoutAuth = create({ baseURL: undefined });

    this.apiSauce.addRequestTransform(request => {
      // insert auth token
      if (this.getAccessToken()) {
        request.headers.Authorization = `Bearer ${this.getAccessToken()}`;
      } else {
        // TODO: Log the unexpected scenario (A tool to do logging is needed here)
      }

      return request;
    });

    this.apiSauceState = 'ready';
  };

  private waitUntilReady = () => {
    return new Promise<void>(resolve => {
      this.waitingList.push(() => resolve());
    });
  };

  private notifyAndReleaseWaitingList = () => {
    // notify the waiters
    for (const entry of this.waitingList) {
      entry();
    }

    // empty the list
    this.waitingList = [];
  };

  private refreshAccessToken = async () => {
    const currentRefreshToken = this.getRefreshToken();

    if (!currentRefreshToken) {
      throw new APIError('INTERNAL_ERROR', 'Refresh token is not available!');
    }

    const response = (await new Promise(r => setTimeout(r, 2000))) as any; //TODO::replace with the actual get tokens API call && add the relevant logic once those APIs are ready

    if (!response!.ok) {
      throw new APIError(response.problem, response.data);
    }

    // update both refresh and access token
    if (!response.data) {
      throw new APIError('INTERNAL_ERROR', 'Refresh Access Token request returned no data');
    }

    const accessToken = response.data.access_token;
    const refreshToken = response.data.refresh_token || currentRefreshToken;
    this.onTokenUpdate(accessToken, refreshToken);
  };

  private fetch = async <T, U = T>(
    method: HttpVerbs,
    path: string,
    params: unknown,
    data: unknown,
    anonymous: boolean,
    headers: any,
  ) => {
    const baseUrl = this.baseUrl;

    if (!baseUrl) {
      throw new APIError('INTERNAL_ERROR', `DnsUrl is not available for ${baseUrl}`);
    }

    let response: ApiResponse<T, U>;

    if (anonymous) {
      response = await this.apiSauceWithoutAuth.any<T, U>({
        method,
        baseURL: this.baseUrl,
        url: path,
        params,
        data,
        headers,
      });
    } else {
      // wait while apiSauce is not ready
      if (this.apiSauceState === 'pending') {
        await this.waitUntilReady();
      }

      // an authenticated request must now flow through if access token / refresh token is not defined
      if (!this.getAccessToken() && !IS_JEST_RUNTIME) {
        throw new APIError('INTERNAL_ERROR', 'Access token is not defined');
      }

      if (!this.getRefreshToken() && !IS_JEST_RUNTIME) {
        throw new APIError('INTERNAL_ERROR', 'Refresh token is not defined');
      }

      // make the request
      response = await this.apiSauce.any<T, U>({
        method,
        baseURL: baseUrl,
        url: path,
        params,
        data,
        headers,
      });

      // handle the potential need to refresh a token
      if (response.status === 401) {
        if (this.apiSauceState === 'ready') {
          try {
            this.apiSauceState = 'pending';
            await this.refreshAccessToken();
          } catch (error) {
            console.log('Could not refresh the access token', {
              ...(error as APIError<Error>), //TODO::replace with a proper error type
            });
          } finally {
            this.apiSauceState = 'ready';
            // notify other requests waiting for apiSauce to be ready
            this.notifyAndReleaseWaitingList();
          }
        } else {
          await this.waitUntilReady();
        }

        response = await this.apiSauce.any<T, U>({
          method,
          baseURL: baseUrl,
          url: path,
          params,
          data,
          headers,
        });
      }
    }

    // format the response as needed
    if (!response.ok) {
      throw new APIError(response.problem, response.data, response.status);
    }

    return response.data;
  };

  public get = async <T, U = T>(path: string, query?: {}) => {
    return this.fetch<T, U>('GET', path, query, undefined, false, undefined);
  };

  public post = async <T, U = T>(path: string, data?: unknown, query?: {}) => {
    return this.fetch<T, U>('POST', path, query, data, false, undefined);
  };

  public put = async <T, U = T>(path: string, data?: unknown, query?: {}) => {
    return this.fetch<T, U>('PUT', path, query, data, false, undefined);
  };

  public patch = async <T, U = T>(path: string, data?: unknown, query?: {}) => {
    return this.fetch<T, U>('PATCH', path, query, data, false, undefined);
  };

  public delete = async <T, U = T>(path: string, query?: {}) => {
    return this.fetch<T, U>('DELETE', path, query, undefined, false, undefined);
  };

  public getAnonymous = async <T, U = T>(path: string, query?: {}) => {
    return this.fetch<T, U>('GET', path, query, undefined, true, undefined);
  };

  public postAnonymous = async <T, U = T>(path: string, data?: unknown, query?: {}) => {
    return this.fetch<T, U>('POST', path, query, data, true, undefined);
  };

  public getWithCustomHeaders = async <T, U = T>(path: string, query?: {}, headers?: {}) => {
    return this.fetch<T, U>('GET', path, query, undefined, false, headers);
  };

  public postAnonymousWithCustomHeaders = async <T, U = T>(path: string, headers: {}, data: unknown, query?: {}) => {
    return this.fetch<T, U>('POST', path, query, data, true, headers);
  };

  public getApiSauceInstance = () => {
    return this.apiSauceWithoutAuth;
  };
}
