import React, { useEffect } from 'react';
import { Text, View } from 'react-native';

import { Link } from '@sz/components';
import { tw } from '@sz/config';
import { Route } from '@sz/constants';
import { NavigationService, PermissionService } from '@sz/services';

import { BaseMainScreen } from '../components';

export function HomeScreen() {
  // To request notifications permissions
  useEffect(() => {
    //TODO::add proper error pop up to the user
    PermissionService.requestNotificationsPermission().catch(console.error);
  }, []);

  return (
    // TODO::remove this BaseAuthScreen and wrap with relative component
    <BaseMainScreen>
      <View style={tw`m-auto`}>
        <Text style={tw`m-10`}>Home Screen</Text>
      </View>
      <Link
        text="UsingTheAppInfo"
        onPress={() => {
          NavigationService.navigate(Route.UsingTheAppInfoTwelve);
        }}
      />
    </BaseMainScreen>
  );
}
