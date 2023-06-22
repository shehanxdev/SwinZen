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
        headerTitleAlign: TextAlignment.Left,
        headerBackTitleVisible: false,
        headerBackVisible: false,
        headerTransparent: true,
        headerTitle: RightHeaderTitle,
        headerLeft: null,
        headerRight: HeaderRightCloseButton,
        animation: 'slide_from_right',
      }}>
      <Stack.Screen
        name={Route.ProTips}
        component={ProTipsScreen}
        options={({ route }) => ({
          //@ts-ignore -- TODO:: have to declare custom navigation route params
          title: route.params.params.checkpoint,
          /**
           * NOTE:
           * presentation: 'modal' is only supported in android as of now
           * slide_from_bottom is added to get the modal behaviour in android
           */
          presentation: 'modal',
          animation: 'slide_from_bottom',
        })}
      />
    </Stack.Navigator>
  );
}
