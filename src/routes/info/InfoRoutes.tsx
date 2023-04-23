import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { TouchableOpacity } from 'react-native';

import { BackIcon, Text } from '@sz/components';
import { Route, TextAlignment, TextVariant } from '@sz/constants';
import { AboutUsScreen, ContactUsScreen, FAQScreen, PrivacyPolicyScreen, TermsOfUseScreen } from '@sz/screens';
import { NavigationService } from '@sz/services';

export type InfoStackParamList = {
  [Route.AboutUs]: {
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
      <Stack.Screen name={Route.AboutUs} component={AboutUsScreen} options={{ title: 'About us' }} />
      <Stack.Screen name={Route.FAQ} component={FAQScreen} options={{ title: 'FAQ' }} />
      <Stack.Screen name={Route.PrivacyPolicy} component={PrivacyPolicyScreen} options={{ title: 'Privacy policy' }} />
      <Stack.Screen name={Route.TermsOfUse} component={TermsOfUseScreen} options={{ title: 'Terms of use' }} />
      <Stack.Screen name={Route.ContactUs} component={ContactUsScreen} options={{ title: 'Contact us' }} />
    </Stack.Navigator>
  );
}