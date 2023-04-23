import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { TouchableOpacity } from 'react-native';

import { BackIcon, Text } from '@sz/components';
import { Route, TextAlignment, TextVariant } from '@sz/constants';
import { FollowersScreen, NotificationScreen, ProfileSettingsScreen } from '@sz/screens';
import { NavigationService } from '@sz/services';

export type AccountStackParamList = {
  [Route.ProfileSettings]: {
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
        headerTitle: ({ children }) => <Text variant={TextVariant.SubTitle2SemiBold}>{children}</Text>,
        headerLeft: () => (
          <TouchableOpacity onPress={() => NavigationService.goBack()}>
            <BackIcon />
          </TouchableOpacity>
        ),
      }}>
      <Stack.Screen
        name={Route.ProfileSettings}
        component={ProfileSettingsScreen}
        options={{ title: 'Profile Settings' }}
      />
      <Stack.Screen name={Route.Notification} component={NotificationScreen} options={{ title: 'Notifications' }} />
      <Stack.Screen name={Route.Followers} component={FollowersScreen} options={{ title: 'Followers' }} />
    </Stack.Navigator>
  );
}
