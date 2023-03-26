import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { Route } from '@sz/constants';
import { PrivacyPolicyScreen, RegisterEmailVerificationScreen, SignupScreen, TermsOfUseScreen } from '@sz/screens';

export type SignupStackParamList = {
  [Route.Signup]: {
    // Can be used for future props
  };
  [Route.RegisterEmailVerification]: {
    // Can be used for future props
  };
  [Route.PrivacyPolicy]: {
    // Can be used for future props
  };
  [Route.TermsOfUse]: {
    // Can be used for future props
  };
};

const Stack = createNativeStackNavigator<SignupStackParamList>();

export function SignupStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={Route.Signup} component={SignupScreen} />
      <Stack.Screen name={Route.RegisterEmailVerification} component={RegisterEmailVerificationScreen} />
      <Stack.Screen name={Route.PrivacyPolicy} component={PrivacyPolicyScreen} />
      <Stack.Screen name={Route.TermsOfUse} component={TermsOfUseScreen} />
    </Stack.Navigator>
  );
}
