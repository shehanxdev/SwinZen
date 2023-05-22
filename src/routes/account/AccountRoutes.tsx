import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { Text } from '@sz/components';
import { Route, TextAlignment, TextVariant } from '@sz/constants';
import { FollowersScreen, NotificationScreen } from '@sz/screens';

import { HeaderBackButton } from '../components';
import { ProfileStack } from './ProfileRoutes';

export type AccountStackParamList = {
  [Route.ProfileStack]: {
    // Can be used for future props
  };
  [Route.Notification]: {
    // Can be used for future props
  };
  [Route.Followers]: {
    // Can be used for future props
  };
};

const Stack = createNativeStackNavigator<AccountStackParamList>();

export function AccountStack() {
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
      <Stack.Screen name={Route.ProfileStack} component={ProfileStack} options={{ headerShown: false }} />
      <Stack.Screen name={Route.Notification} component={NotificationScreen} options={{ title: 'Notifications' }} />
      <Stack.Screen name={Route.Followers} component={FollowersScreen} options={{ title: 'Followers' }} />
    </Stack.Navigator>
  );
}
