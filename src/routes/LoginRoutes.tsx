import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { TouchableOpacity } from 'react-native';

import { BackIcon } from '@sz/components';
import { Route } from '@sz/constants';
import {
  ForgotPasswordScreen,
  LoginScreen,
  ResetPasswordEmailVerificationScreen,
  ResetPasswordScreen,
} from '@sz/screens';
import { NavigationService } from '@sz/services';

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
        title: '',
        headerShown: true,
        headerBackTitleVisible: false,
        headerTransparent: true,
        headerLeft: () => (
          <TouchableOpacity onPress={() => NavigationService.goBack()}>
            <BackIcon />
          </TouchableOpacity>
        ),
      }}>
      <Stack.Screen name={Route.Login} component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name={Route.ForgotPassword} component={ForgotPasswordScreen} />
      <Stack.Screen name={Route.ResetPasswordEmailVerification} component={ResetPasswordEmailVerificationScreen} />
      <Stack.Screen name={Route.ResetPassword} component={ResetPasswordScreen} />
    </Stack.Navigator>
  );
}
