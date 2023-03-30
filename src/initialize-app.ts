/*
 * NOTE::This is a work around to avoid circular dependancy issue.
 */
import Config from 'react-native-config';

import { ConfigService, HttpService, HttpServiceInstance } from '@sz/services';
import { initializeStore, store } from '@sz/stores';

ConfigService.setCallback(key => Config[key]);

initializeStore();

const getAccessToken = () => {
  return store.getState().userStore.accessToken;
};

const getRefreshToken = () => {
  return store.getState().userStore.refreshToken;
};

const onTokenUpdate = (accessToken: string, refreshToken: string) => {
  store.dispatch.userStore.setAccessToken(accessToken);
  store.dispatch.userStore.setRefreshToken(refreshToken);

  //TODO::update auth state in secure storage
};

const httpService = new HttpService(
  ConfigService.getConfig('BASE_URL'),
  getAccessToken,
  getRefreshToken,
  onTokenUpdate,
);

HttpServiceInstance.setHttpServiceInstance(httpService);
