import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { Route, TextAlignment } from '@sz/constants';
import { AnalysisScreen } from '@sz/screens';

import { HeaderBackButton, HeaderTitle } from '../components';

export type AnalysisStackParamList = {
  [Route.AnalysisTab]: {
    // Can be used for future props
  };
  [Route.AnalysisScreen]: {
    // Can be used for future props
  };
};

const Stack = createNativeStackNavigator<AnalysisStackParamList>();

export function AnalysisStack() {
  return (
    <Stack.Navigator
      initialRouteName={Route.AnalysisTab}
      screenOptions={{
        headerTitleAlign: TextAlignment.Center,
        headerBackTitleVisible: false,
        headerBackVisible: false,
        headerTransparent: true,
        headerTitle: HeaderTitle,
        headerLeft: HeaderBackButton,
        animation: 'slide_from_right',
      }}>
      <Stack.Screen
        name={Route.AnalysisScreen}
        component={AnalysisScreen}
        options={{ title: 'Swing analysis report', headerLeft: null }}
      />
    </Stack.Navigator>
  );
}
