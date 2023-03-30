import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { Route } from '@sz/constants';

import { MainBottomTabRoutes } from './MainBottomTabRoutes';

export type MainStackParamList = {
  [Route.MainBottomTabRoutesStack]: {
    // Can be used for future props
  };
};

const Stack = createNativeStackNavigator<MainStackParamList>();

export function MainStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={Route.MainBottomTabRoutesStack} component={MainBottomTabRoutes} />
    </Stack.Navigator>
  );
}
