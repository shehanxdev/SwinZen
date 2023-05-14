import { NavigationContainer, NavigationState } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Text } from 'react-native';
import SplashScreen from 'react-native-splash-screen';

import { Route } from '@sz/constants';
import { NavigationService } from '@sz/services';
import { useDispatch, useSelector } from '@sz/stores';

import { AccountStack } from './account';
import { AuthStack } from './auth';
import { InfoStack } from './info';
import { MainStack } from './main';
import { PricePlansStack } from './pricePlans';

const Stack = createStackNavigator();

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

  const onStateChange = async (navigationState: NavigationState) => {
    const currentRouteName = getActiveRouteName(navigationState);

    routeNameRef.current = currentRouteName;

    setCurrentRoute(currentRouteName);
  };

  return (
    <NavigationContainer
      ref={NavigationService.navigationRef}
      onReady={() => {
        SplashScreen.hide();
        routeNameRef.current = NavigationService.navigationRef.current.getCurrentRoute().name;
      }}
      fallback={<Text>Loading...</Text>} //TODO:: update to an actual loading indicator
      onStateChange={onStateChange}>
      <Stack.Navigator
        initialRouteName={isAuthenticated ? Route.MainStack : Route.AuthStack}
        screenOptions={{
          headerShown: false,
        }}>
        {isAuthenticated ? (
          <Stack.Group>
            <Stack.Screen name={Route.PricePlansStack} component={PricePlansStack} />
            <Stack.Screen name={Route.MainStack} component={MainStack} />
            <Stack.Screen name={Route.AccountStack} component={AccountStack} />
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
