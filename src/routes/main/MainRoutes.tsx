import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { Route } from '@sz/constants';

import { AccountStack } from '../account';
import { PricePlansStack } from '../pricePlans';
import { MainDrawerStack } from './MainDrawerRoutes';

const Stack = createNativeStackNavigator();

export function MainStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerBackVisible: false,
        animation: 'slide_from_right',
      }}>
      <Stack.Screen name={Route.MainDrawerRoutesStack} component={MainDrawerStack} />
      <Stack.Screen name={Route.PricePlansStack} component={PricePlansStack} />
      <Stack.Screen name={Route.AccountStack} component={AccountStack} />
    </Stack.Navigator>
  );
}
