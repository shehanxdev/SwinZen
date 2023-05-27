import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { Text } from '@sz/components';
import { Route, TextAlignment, TextVariant } from '@sz/constants';
import { GolfTipsPlaylistScreen, GolfTipsScreen, LibraryScreen } from '@sz/screens';

import { HeaderBackButton } from '../components';

export type LibraryStackParamList = {
  [Route.LibraryTab]: {
    // Can be used for future props
  };
  [Route.GolfTips]: {
    // Can be used for future props
  };
  [Route.GolfTipsPlaylist]: {
    // Can be used for future props
  };
};

const Stack = createNativeStackNavigator<LibraryStackParamList>();

export function LibraryStack() {
  return (
    <Stack.Navigator
      initialRouteName={Route.LibraryTab}
      screenOptions={{
        headerTitleAlign: TextAlignment.Center,
        headerBackTitleVisible: false,
        headerBackVisible: false,
        headerTransparent: true,
        headerTitle: ({ children }) => <Text variant={TextVariant.SubTitle2SemiBold}>{children}</Text>,
        headerLeft: () => <HeaderBackButton />,
      }}>
      <Stack.Screen
        name={Route.LibraryTab}
        component={LibraryScreen}
        options={{ title: 'SwingZen University', headerLeft: null }}
      />
      <Stack.Screen name={Route.GolfTips} component={GolfTipsScreen} options={{ title: 'Golf tips' }} />
      <Stack.Screen
        name={Route.GolfTipsPlaylist}
        component={GolfTipsPlaylistScreen}
        //@ts-ignore -- TODO::this will be removed once the issue is figured out
        options={({ route }) => ({ title: route.params.tipsCategory })}
      />
    </Stack.Navigator>
  );
}
