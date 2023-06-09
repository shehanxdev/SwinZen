import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { Route, TextAlignment } from '@sz/constants';
import { GolfTipsScreen, LibraryInfoScreen } from '@sz/screens';

import { HeaderBackButton, HeaderTitle } from '../components';

export type LibraryInfoStackParamList = {
  [Route.GolfTips]: {
    // Can be used for future props
  };
  [Route.LibraryInfo]: {
    // Can be used for future props
  };
};

const Stack = createNativeStackNavigator<LibraryInfoStackParamList>();

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
    </Stack.Navigator>
  );
}
