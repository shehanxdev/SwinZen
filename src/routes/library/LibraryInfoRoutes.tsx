import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { Route, TextAlignment } from '@sz/constants';
import {
  ASZInfoEightScreen,
  ASZInfoFiveScreen,
  ASZInfoFourScreen,
  ASZInfoOneScreen,
  ASZInfoSevenScreen,
  ASZInfoSixScreen,
  ASZInfoThreeScreen,
  ASZInfoTwoScreen,
  GolfTipsScreen,
  LibraryInfoScreen,
} from '@sz/screens';

import { HeaderBackButton, HeaderTitle } from '../components';

export type LibraryInfoStackParamList = {
  [Route.GolfTips]: {
    // Can be used for future props
  };
  [Route.AboutSwignzenInfoEight]: {
    // Can be used for future props
  };
  [Route.AboutSwignzenInfoFive]: {
    // Can be used for future props
  };
  [Route.AboutSwignzenInfoFour]: {
    // Can be used for future props
  };
  [Route.AboutSwignzenInfoOne]: {
    // Can be used for future props
  };
  [Route.AboutSwignzenInfoSeven]: {
    // Can be used for future props
  };
  [Route.AboutSwignzenInfoSix]: {
    // Can be used for future props
  };
  [Route.AboutSwignzenInfoThree]: {
    // Can be used for future props
  };
  [Route.AboutSwignzenInfoTwo]: {
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
      <Stack.Screen
        name={Route.AboutSwignzenInfoEight}
        component={ASZInfoEightScreen}
        options={{ title: 'Shooting setup' }}
      />
      <Stack.Screen
        name={Route.AboutSwignzenInfoFive}
        component={ASZInfoFiveScreen}
        options={{ title: 'Down the line AI Pro' }}
      />
      <Stack.Screen
        name={Route.AboutSwignzenInfoFour}
        component={ASZInfoFourScreen}
        options={{ title: 'Down the line analytics' }}
      />
      <Stack.Screen
        name={Route.AboutSwignzenInfoOne}
        component={ASZInfoOneScreen}
        options={{ title: 'SwingZen analyzer app' }}
      />
      <Stack.Screen
        name={Route.AboutSwignzenInfoSeven}
        component={ASZInfoSevenScreen}
        options={{ title: 'Face on AI Pro' }}
      />
      <Stack.Screen
        name={Route.AboutSwignzenInfoSix}
        component={ASZInfoSixScreen}
        options={{ title: 'Face on analytics' }}
      />
      <Stack.Screen
        name={Route.AboutSwignzenInfoThree}
        component={ASZInfoThreeScreen}
        options={{ title: 'iPhone and android capabilities' }}
      />
      <Stack.Screen
        name={Route.AboutSwignzenInfoTwo}
        component={ASZInfoTwoScreen}
        options={{ title: 'Video capture speed' }}
      />
      <Stack.Screen name={Route.GolfTips} component={GolfTipsScreen} options={{ title: 'Golf tips' }} />
      <Stack.Screen name={Route.LibraryInfo} component={LibraryInfoScreen} options={{ title: '' }} />
    </Stack.Navigator>
  );
}
