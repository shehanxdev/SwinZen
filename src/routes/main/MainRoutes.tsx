import { createDrawerNavigator } from '@react-navigation/drawer';
import React, { useEffect } from 'react';

import { tw } from '@sz/config';
import { Route } from '@sz/constants';
import { SecureAuthService } from '@sz/services';
import { useDispatch } from '@sz/stores';

import { MainBottomTabRoutes } from './MainBottomTabRoutes';
import { CustomDrawer } from './components';

export type MainStackParamList = {
  [Route.MainBottomTabRoutesStack]: {
    // Can be used for future props
  };
};

// TODO:: use/move the drawer at the most suitable place
const Drawer = createDrawerNavigator<MainStackParamList>();

export function MainStack() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function grantTokenAccess() {
      const tokens = await SecureAuthService.getAuthTokens();

      dispatch.userStore.setAccessToken(tokens.accessToken);
      dispatch.userStore.setRefreshToken(tokens.refreshToken);
    }

    grantTokenAccess().catch(console.log);
  }, []);

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerType: 'front',
        drawerStyle: tw`bg-transparent rounded-r-8 border-neutral-500 border-r-2`,
      }}
      drawerContent={() => <CustomDrawer />}>
      <Drawer.Screen
        name={Route.MainBottomTabRoutesStack}
        component={MainBottomTabRoutes}
        options={{
          drawerItemStyle: { height: 0 },
        }}
      />
    </Drawer.Navigator>
  );
}
