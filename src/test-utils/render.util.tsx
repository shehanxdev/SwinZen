import { NavigationContext } from '@react-navigation/native';
import { render } from '@testing-library/react-native';
import React, { ReactNode } from 'react';
import Config from 'react-native-config';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';

import { paperTheme } from '@sz/config';
import { ConfigService } from '@sz/services';
import { store } from '@sz/stores';

type RenderParams = Parameters<typeof render>;

export function renderWithProviders(ui: RenderParams[0], options?: RenderParams[1]) {
  ConfigService.setCallback(key => Config[key]);

  const BaseProviders = ({ children }: { children: ReactNode }) => (
    <Provider store={store}>
      <NavigationContext.Provider
        //@ts-ignore
        value={{
          isFocused: () => true,
          addListener: jest.fn(() => jest.fn()),
        }}>
        <PaperProvider theme={paperTheme}>{children}</PaperProvider>
      </NavigationContext.Provider>
    </Provider>
  );

  return render(ui, { wrapper: BaseProviders, ...options });
}
