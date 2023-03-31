import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { Route } from '@sz/constants';

import { LoginStack } from './LoginRoutes';
import { SignupStack } from './SignupRoutes';

export type AuthStackParamList = {
  [Route.LoginStack]: {
    // Can be used for future props
  };
  [Route.SignupStack]: {
    // Can be used for future props
  };
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

export function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={Route.LoginStack} component={LoginStack} />
      <Stack.Screen name={Route.SignupStack} component={SignupStack} />
    </Stack.Navigator>
  );
}
