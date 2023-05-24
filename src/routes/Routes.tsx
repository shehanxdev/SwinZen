import { NavigationContainer, NavigationState } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Text } from 'react-native';
import SplashScreen from 'react-native-splash-screen';

import { Route } from '@sz/constants';
import { NavigationService } from '@sz/services';
import { useDispatch, useSelector } from '@sz/stores';

import { AuthStack } from './auth';
import { InfoStack } from './info';
import { MainStack } from './main';

const Stack = createNativeStackNavigator();

export function Routes() {
  const routeNameRef = React.useRef();

  const setCurrentRoute = useDispatch().appStore.setCurrentRoute;

  const isAuthenticated = useSelector(state => state.persistentUserStore.isAuthenticated);

  function getActiveRouteName(navigationState: NavigationState): any {
    if (!navigationState) {
      return null;
    }
    const route: any = navigationState.routes[navigationState.index];

    // dive into nested navigators
    if (route.state) {
      return getActiveRouteName(route.state);
    }
    return route.name;
  }

  const onStateChange = (navigationState: NavigationState) => {
    const currentRouteName = getActiveRouteName(navigationState);

    routeNameRef.current = currentRouteName;

    setCurrentRoute(currentRouteName);
  };

  const handleUnhandledAction = (
    action: Readonly<{
      type: string;
      payload?: object;
      source?: string;
      target?: string;
    }>,
  ) => {
    if (action.type === 'GO_BACK') {
      NavigationService.reset(isAuthenticated ? Route.MainStack : Route.AuthStack);
    }
  };

  return (
    <NavigationContainer
      ref={NavigationService.navigationRef}
      onReady={() => {
        SplashScreen.hide();
        routeNameRef.current = NavigationService.navigationRef.current.getCurrentRoute().name;
      }}
      fallback={<Text>Loading...</Text>} //TODO:: update to an actual loading indicator
      onUnhandledAction={handleUnhandledAction}
      onStateChange={onStateChange}>
      <Stack.Navigator
        initialRouteName={isAuthenticated ? Route.MainStack : Route.AuthStack}
        screenOptions={{
          headerShown: false,
          headerBackVisible: false,
          animation: 'slide_from_right',
        }}>
        {isAuthenticated ? (
          <Stack.Group>
            <Stack.Screen name={Route.MainStack} component={MainStack} />
          </Stack.Group>
        ) : (
          <Stack.Group>
            <Stack.Screen name={Route.AuthStack} component={AuthStack} />
          </Stack.Group>
        )}

        <Stack.Screen name={Route.InfoStack} component={InfoStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
