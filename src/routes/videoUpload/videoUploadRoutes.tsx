import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { Text } from '@sz/components';
import { Route, TextVariant } from '@sz/constants';
import { VideoSetupScreen } from '@sz/screens';

import { HeaderBackButton } from '../components';
import { HeaderRightLink } from './components';

export type VideoUploadStackParamList = {
  [Route.VideoSetup]: {
    // Can be used for future props
  };
};

const Stack = createNativeStackNavigator<VideoUploadStackParamList>();

export function VideoUploadStack() {
  return (
    <Stack.Navigator
      initialRouteName={Route.VideoSetup}
      screenOptions={{
        headerBackTitleVisible: false,
        headerBackVisible: false,
        headerTransparent: true,
        headerTitle: ({ children }) => <Text variant={TextVariant.SubTitle2SemiBold}>{children}</Text>,
        headerLeft: () => <HeaderBackButton />,
      }}>
      <Stack.Screen
        name={Route.VideoSetup}
        component={VideoSetupScreen}
        options={{ title: '', headerRight: () => <HeaderRightLink /> }}
      />
    </Stack.Navigator>
  );
}
