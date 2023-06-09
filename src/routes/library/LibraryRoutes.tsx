import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { Route, TextAlignment } from '@sz/constants';
import { LibraryScreen } from '@sz/screens';

import { HeaderBackButton, HeaderTitle } from '../components';

const Stack = createNativeStackNavigator();

export function LibraryStack() {
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
      <Stack.Screen
        name={Route.LibraryScreen}
        component={LibraryScreen}
        options={{ title: 'SwingZen University', headerLeft: null }}
      />
    </Stack.Navigator>
  );
}
