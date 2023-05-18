import React, { useEffect } from 'react';
import { Text, View } from 'react-native';

import { tw } from '@sz/config';
import { PermissionService } from '@sz/services';

import { BaseMainScreen } from '../components';

export function HomeScreen() {
  // To request notifications permissions
  useEffect(() => {
    PermissionService.requestNotificationsPermission().catch(console.error);
  }, []);

  return (
    // TODO::remove this BaseAuthScreen and wrap with relative component
    <BaseMainScreen>
      <View style={tw`m-auto`}>
        <Text style={tw`m-10`}>Home Screen</Text>
      </View>
    </BaseMainScreen>
  );
}
