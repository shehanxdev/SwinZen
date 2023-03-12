import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { useDeviceContext } from 'twrnc';

import { paperTheme, tw } from '@sz/config';
import { HttpService, HttpServiceInstance } from '@sz/services';
import { initializeStore, store } from '@sz/stores';
import { getConfig } from '@sz/utils';

import App from './app/App';

initializeStore();

const httpService = new HttpService(getConfig('AUTH0_API_BASE_URL'), getConfig('AUTH0_CLIENT_ID'));

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
