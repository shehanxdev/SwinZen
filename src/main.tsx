import React from 'react';
import Config from 'react-native-config';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { useDeviceContext } from 'twrnc';

import { paperTheme, tw } from '@sz/config';
import { ConfigService, HttpService, HttpServiceInstance } from '@sz/services';
import { initializeStore, store } from '@sz/stores';

import App from './app/App';

ConfigService.setCallback(key => Config[key]);

initializeStore();

const httpService = new HttpService(
  ConfigService.getConfig('AUTH0_API_BASE_URL'),
  ConfigService.getConfig('AUTH0_CLIENT_ID'),
  ConfigService.getConfig('BASE_URL'),
);

HttpServiceInstance.setHttpServiceInstance(httpService);

export function Main() {
  useDeviceContext(tw);

  return (
    <Provider store={store}>
      <PaperProvider theme={paperTheme}>
        <SafeAreaProvider>
          <App />
        </SafeAreaProvider>
      </PaperProvider>
    </Provider>
  );
}

export default Main;
