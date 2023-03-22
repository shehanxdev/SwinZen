import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { withGradientBackground } from '@sz/utils';

import { Route } from './../constants';
import { ForgetPasswordScreen, ResetPasswordEmailVerificationScreen, ResetPasswordScreen } from './../screens';
import { LoginScreen } from './../screens';

export type LoginStackParamList = {
  [Route.Login]: {
    // Can be used for future props
  };
  [Route.ForgetPassword]: {
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
      <Stack.Screen name={Route.ForgetPassword} component={ForgetPasswordScreen} />
      <Stack.Screen
        name={Route.ResetPasswordEmailVerification}
        component={withGradientBackground({ BaseScreen: ResetPasswordEmailVerificationScreen })}
      />
      <Stack.Screen name={Route.ResetPassword} component={ResetPasswordScreen} />
    </Stack.Navigator>
  );
}
