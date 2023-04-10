import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';

import { tw } from '@sz/config';
import { Route } from '@sz/constants';
import { NotificationScreen, ProfileSettingsScreen } from '@sz/screens';

import { MainBottomTabRoutes } from './MainBottomTabRoutes';
import { CustomDrawer } from './components';

export type MainStackParamList = {
  [Route.MainBottomTabRoutesStack]: {
    // Can be used for future props
  };
  [Route.ProfileSettings]: {
    // Can be used for future props
  };
  [Route.Notification]: {
    // Can be used for future props
  };
};

// TODO:: use/move the drawer at the most suitable place
const Drawer = createDrawerNavigator<MainStackParamList>();

export function MainStack() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerType: 'front',
        drawerStyle: tw`bg-transparent rounded-r-[32px] border-neutral-500 border-r-2`,
      }}
      drawerContent={() => <CustomDrawer />}>
      <Drawer.Screen
        name={Route.MainBottomTabRoutesStack}
        component={MainBottomTabRoutes}
        options={{
          drawerItemStyle: { height: 0 },
        }}
      />
      <Drawer.Screen
        name={Route.ProfileSettings}
        component={ProfileSettingsScreen}
        options={{ title: 'Profile settings' }}
      />
      <Drawer.Screen name={Route.Notification} component={NotificationScreen} options={{ title: 'Notifications' }} />
    </Drawer.Navigator>
  );
}
