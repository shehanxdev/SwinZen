/*
 * NOTE::This is a work around to avoid circular dependancy issue.
 */
import Config from 'react-native-config';

import {
  ConfigService,
  HttpService,
  HttpServiceInstance,
  SecureAuthService,
  SecureAuthServiceInstance,
} from '@sz/services';
import { initializeStore, store } from '@sz/stores';

//Config service
ConfigService.setCallback(key => Config[key]);

//rematch store
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

//Http service
const httpService = new HttpService(
  ConfigService.getConfig('BASE_URL'),
  getAccessToken,
  getRefreshToken,
  onTokenUpdate,
);

HttpServiceInstance.setHttpServiceInstance(httpService);

//Secure auth service
const secureAuthService = new SecureAuthService(
  //NOTE::Current secure auth service implementation uses SECRET_PASSPHRASE which defined as an environment variable as secret passphrase.
  //This is being used as secret passphrase for the AES symmetric encryption standard.
  ConfigService.getConfig('SECRET_PASSPHRASE_FOR_ENCRYPT_TOKENS'),
);

SecureAuthServiceInstance.setSecureAuthServiceInstance(secureAuthService);
