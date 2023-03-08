import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Route } from './../constants';
import { EmailVerificationScreen, PrivacyPolicyScreen, SignupScreen, TermsOfUseScreen } from './../screens';

export type AuthStackParamList = {
  [Route.Signup]: {
    // Can be used for future props
  };
  [Route.EmailVerification]: {
    // Can be used for future props
  };
  [Route.PrivacyPolicy]: {
    // Can be used for future props
  };
  [Route.TermsOfUse]: {
    // Can be used for future props
  };
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

export const SignupStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: '#1A5C23',
        },
      }}>
      <Stack.Screen name={Route.Signup} component={SignupScreen} />
      <Stack.Screen name={Route.EmailVerification} component={EmailVerificationScreen} />
      <Stack.Screen name={Route.PrivacyPolicy} component={PrivacyPolicyScreen} />
      <Stack.Screen name={Route.TermsOfUse} component={TermsOfUseScreen} />
    </Stack.Navigator>
  );
};
