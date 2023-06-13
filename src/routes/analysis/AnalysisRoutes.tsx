import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { Route, TextAlignment } from '@sz/constants';
import { ProTipsScreen } from '@sz/screens';

import { HeaderRightCloseButton } from '../components';
import { RightHeaderTitle } from './components';

const Stack = createNativeStackNavigator();

export function AnalysisStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: TextAlignment.Center,
        headerBackTitleVisible: false,
        headerBackVisible: false,
        headerTransparent: true,
        headerTitle: RightHeaderTitle,
        headerLeft: null,
        headerRight: HeaderRightCloseButton,
        animation: 'slide_from_right',
      }}>
      <Stack.Screen name={Route.ProTips} component={ProTipsScreen} />
    </Stack.Navigator>
  );
}
