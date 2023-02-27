// TODO::remove relative imports once the TS custom path issue get resolved
import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { useDeviceContext } from 'twrnc';

import App from './app/App';
import { tw } from './config';
import { paperTheme } from './config/paper.config';
import { initializeStore, store } from './stores/';

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