import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { Route, TextAlignment } from '@sz/constants';
import { ChangePasswordScreen, ProfileSettingsScreen } from '@sz/screens';

import { HeaderBackButton, HeaderTitle } from '../components';

export type ProfileStackParamList = {
  [Route.ProfileSettings]: {
    // Can be used for future props
  };
  [Route.ChangePassword]: {
    // Can be used for future props
  };
  //TODO::fill once other screens are ready
};

const Stack = createNativeStackNavigator<ProfileStackParamList>();

export function ProfileStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: TextAlignment.Center,
        headerBackTitleVisible: false,
        headerTransparent: true,
        headerBackVisible: false,
        headerTitle: HeaderTitle,
        headerLeft: HeaderBackButton,
        animation: 'slide_from_right',
      }}>
      <Stack.Screen
        name={Route.ProfileSettings}
        component={ProfileSettingsScreen}
        options={{ title: 'Profile Settings' }}
      />
      <Stack.Screen
        name={Route.ChangePassword}
        component={ChangePasswordScreen}
        options={{ title: 'Change password' }}
      />
    </Stack.Navigator>
  );
}
