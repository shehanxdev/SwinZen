import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { Route, TextAlignment } from '@sz/constants';
import { GolfTipsScreen } from '@sz/screens';

import { HeaderBackButton, HeaderTitle } from '../components';

export type LibraryStackParamList = {
  [Route.GolfTips]: {
    // Can be used for future props
  };
};

const Stack = createNativeStackNavigator<LibraryStackParamList>();

export function LibraryStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: TextAlignment.Center,
        headerBackTitleVisible: false,
        headerBackVisible: false,
        headerTransparent: true,
        headerTitle: HeaderTitle,
        animation: 'slide_from_right',
      }}>
      <Stack.Screen
        name={Route.GolfTips}
        component={GolfTipsScreen}
        options={{ title: 'Golf tips', headerLeft: HeaderBackButton }}
      />
    </Stack.Navigator>
  );
}
