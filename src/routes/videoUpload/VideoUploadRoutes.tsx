import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { Route } from '@sz/constants';
import { HowToShootScreen, PreValidationScreen, VideoSetupScreen } from '@sz/screens';

import { HeaderBackButton, HeaderTitle } from '../components';
import { HeaderRightLink } from './components';

const Stack = createNativeStackNavigator();

export function VideoUploadStack() {
  const renderHeaderRight = () => <HeaderRightLink text="How to Shoot" />;
  const renderHeaderTitle = () => <HeaderTitle>Shooting instructions</HeaderTitle>;

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
        options={{ title: '', headerRight: renderHeaderRight }}
      />
      <Stack.Screen
        name={Route.HowToShoot}
        component={HowToShootScreen}
        options={{
          headerLeft: renderHeaderTitle,
          title: '',
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
