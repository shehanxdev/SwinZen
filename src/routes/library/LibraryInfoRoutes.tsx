import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { Route, TextAlignment } from '@sz/constants';
import { GolfTipsScreen, LibraryInfoScreen, ShootingSetupScreen } from '@sz/screens';

import { HeaderBackButton, HeaderTitle } from '../components';

const Stack = createNativeStackNavigator();

export function LibraryInfoStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: TextAlignment.Center,
        headerBackTitleVisible: false,
        headerBackVisible: false,
        headerTransparent: true,
        headerTitle: HeaderTitle,
        headerLeft: HeaderBackButton,
        animation: 'slide_from_right',
      }}>
      <Stack.Screen name={Route.GolfTips} component={GolfTipsScreen} options={{ title: 'Golf tips' }} />
      <Stack.Screen name={Route.LibraryInfo} component={LibraryInfoScreen} options={{ title: '' }} />
      <Stack.Screen name={Route.ShootingSetup} component={ShootingSetupScreen} options={{ title: 'Shooting setup' }} />
    </Stack.Navigator>
  );
}
