import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { Route } from '@sz/constants';
import { PrivacyPolicyScreen, TermsOfUseScreen } from '@sz/screens';

export type InfoStackParamList = {
  [Route.PrivacyPolicy]: {
    // Can be used for future props
  };
  [Route.TermsOfUse]: {
    // Can be used for future props
  };
};

const Stack = createNativeStackNavigator<InfoStackParamList>();

export function InfoStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={Route.PrivacyPolicy} component={PrivacyPolicyScreen} />
      <Stack.Screen name={Route.TermsOfUse} component={TermsOfUseScreen} />
    </Stack.Navigator>
  );
}
