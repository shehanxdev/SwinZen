import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { useDeviceContext } from 'twrnc';

import { tw } from '@sz/config';
import { paperTheme } from '@sz/config';
import { initializeStore, store } from '@sz/stores';

import App from './app/App';

initializeStore();

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
