import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { TouchableOpacity } from 'react-native';

import { BackIcon, Text } from '@sz/components';
import { Route, TextAlignment, TextVariant } from '@sz/constants';
import {
  AboutUsScreen,
  ContactUsScreen,
  FollowersScreen,
  NotificationScreen,
  PrivacyPolicyScreen,
  ProfileSettingsScreen,
  TermsOfUseScreen,
} from '@sz/screens';
import { NavigationService } from '@sz/services';

export type InfoStackParamList = {
  [Route.ProfileSettings]: {
    // Can be used for future props
  };
  [Route.Notification]: {
    // Can be used for future props
  };
  [Route.Followers]: {
    // Can be used for future props
  };
  [Route.AboutUs]: {
    // Can be used for future props
  };
  [Route.PrivacyPolicy]: {
    // Can be used for future props
  };
  [Route.TermsOfUse]: {
    // Can be used for future props
  };
  [Route.ContactUs]: {
    // Can be used for future props
  };
};

const Stack = createNativeStackNavigator<InfoStackParamList>();

export function InfoStack() {
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
        options={{ title: 'Profile settings' }}
      />
      <Stack.Screen name={Route.Notification} component={NotificationScreen} options={{ title: 'Notifications' }} />
      <Stack.Screen name={Route.Followers} component={FollowersScreen} options={{ title: 'Followers' }} />
      <Stack.Screen name={Route.AboutUs} component={AboutUsScreen} options={{ title: 'About us' }} />
      <Stack.Screen name={Route.PrivacyPolicy} component={PrivacyPolicyScreen} options={{ title: 'Privacy policy' }} />
      <Stack.Screen name={Route.TermsOfUse} component={TermsOfUseScreen} options={{ title: 'Terms of use' }} />
      <Stack.Screen name={Route.ContactUs} component={ContactUsScreen} options={{ title: 'Contact us' }} />
    </Stack.Navigator>
  );
}
