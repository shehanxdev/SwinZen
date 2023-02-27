import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Route } from './../constants';
import { EmailVerificationScreen, LoginScreen, SignupScreen } from './../screens';

export type AuthStackParamList = {
  [Route.Login]: {
    // Can be used for future props
  };
  [Route.Signup]: {
    // Can be used for future props
  };
  [Route.EmailVertification]: {
    // Can be used for future props
  };
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

export function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name={Route.Login} component={LoginScreen} options={{ title: 'Login' }} />
      <Stack.Screen name={Route.Signup} component={SignupScreen} options={{ title: 'Sign Up' }} />
      <Stack.Screen
        name={Route.EmailVertification}
        component={EmailVerificationScreen}
        options={{ title: 'Email Verification' }}
      />
    </Stack.Navigator>
  );
}
