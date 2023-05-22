import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { Text } from '@sz/components';
import { Route, TextAlignment, TextVariant } from '@sz/constants';
import { ChangePasswordScreen, ProfileSettingsScreen } from '@sz/screens';

import { HeaderBackButton } from '../components';

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
        headerTitle: ({ children }) => <Text variant={TextVariant.SubTitle2SemiBold}>{children}</Text>,
        headerLeft: () => <HeaderBackButton />,
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
