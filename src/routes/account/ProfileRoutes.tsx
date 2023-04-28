import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { Route } from '@sz/constants';
import { ChangePasswordScreen, ProfileSettingsScreen } from '@sz/screens';

export type ProfileStackParamList = {
  [Route.ProfileSettings]: {
    // Can be used for future props
  };
  [Route.ChangePassword]: {
    // Can be used for future props
  };
  //TODO::fill once other screens are ready
};

const Stack = createStackNavigator<ProfileStackParamList>();

export function ProfileStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={Route.ProfileSettings} component={ProfileSettingsScreen} />
      <Stack.Screen name={Route.ChangePassword} component={ChangePasswordScreen} />
    </Stack.Navigator>
  );
}
