import messaging from '@react-native-firebase/messaging';
import React, { useEffect } from 'react';
import { Text, View } from 'react-native';

import { tw } from '@sz/config';
import { useFetch } from '@sz/hooks';
import { PermissionService, UserService } from '@sz/services';

import { BaseMainScreen } from '../components';

export function HomeScreen() {
  const { data } = useFetch(() => UserService.patchUserData({}));
  console.log('#######USERDATA#####', data);

  // firebase device registration and store fcm token
  const registerAppWithFCM = async () => {
    await messaging().registerDeviceForRemoteMessages();
    const token = await messaging().getToken();
    console.log('@@@###', token);
  };

  // To request notifications permissions
  useEffect(() => {
    PermissionService.requestNotificationsPermission();
    registerAppWithFCM();
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
