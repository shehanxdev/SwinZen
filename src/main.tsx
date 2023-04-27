import React from 'react';
import ErrorBoundary from 'react-native-error-boundary';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { useDeviceContext } from 'twrnc';

import { paperTheme, tw } from '@sz/config';
import { UnexpectedErrorScreen } from '@sz/screens';
import { store } from '@sz/stores';

import App from './app/App';
import './initialize-app';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler = (error: Error, stackTrace: string) => {
  /* TODO: Log the error to an error reporting service */
};

export function Main() {
  useDeviceContext(tw);

  return (
    <ErrorBoundary FallbackComponent={UnexpectedErrorScreen} onError={errorHandler}>
      <Provider store={store}>
        <PaperProvider theme={paperTheme}>
          <SafeAreaProvider>
            <App />
          </SafeAreaProvider>
        </PaperProvider>
      </Provider>
    </ErrorBoundary>
  );
}

export default Main;
