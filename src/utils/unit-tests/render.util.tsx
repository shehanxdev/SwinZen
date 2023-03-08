import { render } from '@testing-library/react-native';
import { ReactNode } from 'react';
import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';

import { paperTheme } from '@sz/config';
import { store } from '@sz/stores';

type RenderParams = Parameters<typeof render>;

export function renderWithProviders(ui: RenderParams[0], options?: RenderParams[1]) {
  const BaseProviders = ({ children }: { children: ReactNode }) => (
    <Provider store={store}>
      <PaperProvider theme={paperTheme}>
        <SafeAreaProvider>{children}</SafeAreaProvider>
      </PaperProvider>
    </Provider>
  );

  return render(ui, { wrapper: BaseProviders, ...options });
}
