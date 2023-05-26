import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { Route, TextAlignment } from '@sz/constants';
import { AboutUsScreen, ContactUsScreen, FAQScreen, PrivacyPolicyScreen, TermsOfUseScreen } from '@sz/screens';

import { HeaderBackButton, HeaderTitle } from '../components';
import { LibraryInfoStack } from './LibraryInfoRoutes';

export type InfoStackParamList = {
  [Route.AboutUs]: {
    // Can be used for future props
  };
  [Route.ContactUs]: {
    // Can be used for future props
  };
  [Route.FAQ]: {
    // Can be used for future props
  };
  [Route.PrivacyPolicy]: {
    // Can be used for future props
  };
  [Route.TermsOfUse]: {
    // Can be used for future props
  };
  [Route.LibraryInfoStack]: {
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
        headerBackVisible: false,
        headerTransparent: true,
        headerTitle: HeaderTitle,
        headerLeft: HeaderBackButton,
        animation: 'slide_from_right',
      }}>
      <Stack.Screen name={Route.AboutUs} component={AboutUsScreen} options={{ title: 'What is SwingZen?' }} />
      <Stack.Screen name={Route.ContactUs} component={ContactUsScreen} options={{ title: 'Contact us' }} />
      <Stack.Screen name={Route.FAQ} component={FAQScreen} options={{ title: 'FAQ' }} />
      <Stack.Screen name={Route.PrivacyPolicy} component={PrivacyPolicyScreen} options={{ title: 'Privacy policy' }} />
      <Stack.Screen name={Route.TermsOfUse} component={TermsOfUseScreen} options={{ title: 'Terms of use' }} />
      <Stack.Screen name={Route.LibraryInfoStack} component={LibraryInfoStack} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
