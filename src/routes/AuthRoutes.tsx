import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { Route } from '@sz/constants';
import { LoginScreen } from '@sz/screens';

import { SignupStack } from './SignupRoutes';

export type AuthStackParamList = {
  [Route.Login]: {
    // Can be used for future props
  };
  [Route.Signup]: {
    // Can be used for future props
  };
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

export const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: '#1A5C23',
        },
      }}>
      <Stack.Screen name={Route.Login} component={LoginScreen} />
      <Stack.Screen name={Route.Signup} component={SignupStack} />
    </Stack.Navigator>
  );
};
