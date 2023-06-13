import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { Route, TextAlignment } from '@sz/constants';
import { AIProTipsScreen, PGAProTipsScreen, SideBySideScreen } from '@sz/screens';

import { HeaderBackButton, HeaderTitle } from '../components';

const Stack = createNativeStackNavigator();

export function AnalysisStack() {
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
      <Stack.Screen name={Route.PGAProTips} component={PGAProTipsScreen} options={{ title: '' }} />
      <Stack.Screen name={Route.AIProTips} component={AIProTipsScreen} options={{ title: '' }} />
      <Stack.Screen name={Route.SideBySide} component={SideBySideScreen} options={{ title: '' }} />
    </Stack.Navigator>
  );
}
