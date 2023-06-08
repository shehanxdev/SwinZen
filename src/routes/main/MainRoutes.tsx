import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { Route } from '@sz/constants';
import { useFirebaseNotifications } from '@sz/hooks';

import { AccountStack } from '../account';
import { LibraryStack } from '../library';
import { PricePlansStack } from '../pricePlans';
import { VideoUploadStack } from '../videosUpload';
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
      <Stack.Screen name={Route.LibraryStack} component={LibraryStack} />
    </Stack.Navigator>
  );
}
