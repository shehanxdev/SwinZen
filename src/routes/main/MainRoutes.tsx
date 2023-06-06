import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { Route } from '@sz/constants';
import { useFirebaseNotifications } from '@sz/hooks';

import { AccountStack } from '../account';
import { PricePlansStack } from '../pricePlans';
import { VideoUploadStack } from '../videoUpload';
import { LibraryInfoStack } from './../library';
import { MainDrawerStack } from './MainDrawerRoutes';

const Stack = createNativeStackNavigator();

export function MainStack() {
  useFirebaseNotifications();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerBackVisible: false,
        animation: 'slide_from_right',
      }}>
      <Stack.Screen name={Route.MainDrawerRoutesStack} component={MainDrawerStack} />
      <Stack.Screen name={Route.PricePlansStack} component={PricePlansStack} />
      <Stack.Screen name={Route.VideoUploadStack} component={VideoUploadStack} />
      <Stack.Screen name={Route.AccountStack} component={AccountStack} />
      <Stack.Screen name={Route.LibraryInfoStack} component={LibraryInfoStack} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
