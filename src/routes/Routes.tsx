import React from 'react';
import { Text } from 'react-native';

import { NavigationContainer, NavigationState } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Route } from './../constants';
import { NavigationService } from './../services';
import { useDispatch } from './../stores';
import { AuthStack } from './AuthRoutes';

const Stack = createStackNavigator();

export function Routes() {
  const routeNameRef = React.useRef();
  const setCurrentRoute = useDispatch().appStore.setCurrentRoute;

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
        routeNameRef.current = NavigationService.navigationRef.current.getCurrentRoute().name;
      }}
      fallback={<Text>Loading...</Text>} //TODO:: update to an actual loading indicator
      onStateChange={onStateChange}>
      <Stack.Navigator
        initialRouteName={Route.AuthStack}
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name={Route.AuthStack} component={AuthStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
