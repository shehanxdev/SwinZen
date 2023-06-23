import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { Route } from '@sz/constants';
import { HowToShootScreen, PreValidationScreen, VideoSetupScreen } from '@sz/screens';

import { HeaderBackButton, HeaderTitle } from '../components';
import { HeaderRightCloseButton, HeaderRightLink } from './components';

const Stack = createNativeStackNavigator();

export function VideoUploadStack() {
  const renderHowToShootLink = () => <HeaderRightLink text="How to Shoot" />;
  const renderShootingInstructionsTitle = () => <HeaderTitle>Shooting instructions</HeaderTitle>;

  return (
    <Stack.Navigator
      initialRouteName={Route.VideoSetup}
      screenOptions={{
        headerBackTitleVisible: false,
        headerBackVisible: false,
        headerTransparent: true,
        headerTitle: HeaderTitle,
        headerLeft: HeaderBackButton,
        animation: 'slide_from_right',
      }}>
      <Stack.Screen
        name={Route.VideoSetup}
        component={VideoSetupScreen}
        options={{ title: '', headerRight: renderHowToShootLink }}
      />
      <Stack.Screen
        name={Route.HowToShoot}
        component={HowToShootScreen}
        options={{
          title: '',
          headerLeft: renderShootingInstructionsTitle,
          headerRight: HeaderRightCloseButton,
          /**
           * NOTE:
           * presentation: 'modal' is only supported in android as of now
           * slide_from_bottom is added to get the modal behaviour in android
           */
          presentation: 'modal',
          animation: 'slide_from_bottom',
        }}
      />
      <Stack.Screen
        name={Route.PreValidation}
        component={PreValidationScreen}
        options={{
          title: 'PreValidation',
        }}
      />
    </Stack.Navigator>
  );
}