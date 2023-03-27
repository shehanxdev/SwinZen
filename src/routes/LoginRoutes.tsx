import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { Route } from './../constants';
import { ForgotPasswordScreen, ResetPasswordEmailVerificationScreen, ResetPasswordScreen } from './../screens';
import { LoginScreen } from './../screens';

export type LoginStackParamList = {
  [Route.Login]: {
    // Can be used for future props
  };
  [Route.ForgotPassword]: {
    // Can be used for future props
  };
  [Route.ResetPasswordEmailVerification]: {
    // Can be used for future props
  };
  [Route.ResetPassword]: {
    // Can be used for future props
  };
};

const Stack = createNativeStackNavigator<LoginStackParamList>();

export function LoginStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={Route.Login} component={LoginScreen} />
      <Stack.Screen name={Route.ForgotPassword} component={ForgotPasswordScreen} />
      <Stack.Screen name={Route.ResetPasswordEmailVerification} component={ResetPasswordEmailVerificationScreen} />
      <Stack.Screen name={Route.ResetPassword} component={ResetPasswordScreen} />
    </Stack.Navigator>
  );
}
