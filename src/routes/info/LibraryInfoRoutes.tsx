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
  UTAInfoEightScreen,
  UTAInfoElevenScreen,
  UTAInfoFiveScreen,
  UTAInfoFourScreen,
  UTAInfoNineScreen,
  UTAInfoOneScreen,
  UTAInfoSevenScreen,
  UTAInfoSixScreen,
  UTAInfoTenScreen,
  UTAInfoThirteenScreen,
  UTAInfoThreeScreen,
  UTAInfoTwelveScreen,
  UTAInfoTwoScreen,
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
  [Route.UsingTheAppInfoEight]: {
    // Can be used for future props
  };
  [Route.UsingTheAppInfoEleven]: {
    // Can be used for future props
  };
  [Route.UsingTheAppInfoFive]: {
    // Can be used for future props
  };
  [Route.UsingTheAppInfoFour]: {
    // Can be used for future props
  };
  [Route.UsingTheAppInfoNine]: {
    // Can be used for future props
  };
  [Route.UsingTheAppInfoOne]: {
    // Can be used for future props
  };
  [Route.UsingTheAppInfoSeven]: {
    // Can be used for future props
  };
  [Route.UsingTheAppInfoSix]: {
    // Can be used for future props
  };
  [Route.UsingTheAppInfoTen]: {
    // Can be used for future props
  };
  [Route.UsingTheAppInfoThirteen]: {
    // Can be used for future props
  };
  [Route.UsingTheAppInfoThree]: {
    // Can be used for future props
  };
  [Route.UsingTheAppInfoTwelve]: {
    // Can be used for future props
  };
  [Route.UsingTheAppInfoTwo]: {
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
      <Stack.Screen
        name={Route.UsingTheAppInfoEight}
        component={UTAInfoEightScreen}
        options={{ title: 'Swing Analysis Results' }}
      />
      <Stack.Screen
        name={Route.UsingTheAppInfoEleven}
        component={UTAInfoElevenScreen}
        options={{ title: 'Pass/Fail' }}
      />
      <Stack.Screen
        name={Route.UsingTheAppInfoFive}
        component={UTAInfoFiveScreen}
        options={{ title: 'Video Processing Time' }}
      />
      <Stack.Screen
        name={Route.UsingTheAppInfoFour}
        component={UTAInfoFourScreen}
        options={{ title: 'Uploading A Video' }}
      />
      <Stack.Screen name={Route.UsingTheAppInfoNine} component={UTAInfoNineScreen} options={{ title: 'Swing Data' }} />
      <Stack.Screen
        name={Route.UsingTheAppInfoOne}
        component={UTAInfoOneScreen}
        options={{ title: 'How To Use The App' }}
      />
      <Stack.Screen
        name={Route.UsingTheAppInfoSeven}
        component={UTAInfoSevenScreen}
        options={{ title: 'Failed Reviews' }}
      />
      <Stack.Screen
        name={Route.UsingTheAppInfoSix}
        component={UTAInfoSixScreen}
        options={{ title: 'Successful Reviews' }}
      />
      <Stack.Screen
        name={Route.UsingTheAppInfoTen}
        component={UTAInfoTenScreen}
        options={{ title: 'Swing Priority List' }}
      />
      <Stack.Screen
        name={Route.UsingTheAppInfoThirteen}
        component={UTAInfoThirteenScreen}
        options={{ title: 'Swing Analysis Report' }}
      />
      <Stack.Screen
        name={Route.UsingTheAppInfoThree}
        component={UTAInfoThreeScreen}
        options={{ title: 'Shooting Hacks' }}
      />
      <Stack.Screen
        name={Route.UsingTheAppInfoTwelve}
        component={UTAInfoTwelveScreen}
        options={{ title: 'AI-Pro Tips' }}
      />
      <Stack.Screen
        name={Route.UsingTheAppInfoTwo}
        component={UTAInfoTwoScreen}
        options={{ title: 'Shooting Environments' }}
      />
    </Stack.Navigator>
  );
}
