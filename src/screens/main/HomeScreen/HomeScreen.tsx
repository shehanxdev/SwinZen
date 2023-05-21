import messaging from '@react-native-firebase/messaging';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

import { tw } from '@sz/config';
import { PermissionService, ToastService } from '@sz/services';
import { useDispatch, useSelector } from '@sz/stores';

import { BaseMainScreen } from '../components';

export function HomeScreen() {
  const [fcmToken, setFcmToken] = useState(null);

  const dispatch = useDispatch();

  const accessToken = useSelector(state => state.userStore.accessToken);
  const data = useSelector(state => state.userStore.userData);

  // firebase device registration and store fcm token
  const registerAppWithFCM = async () => {
    try {
      const token = await messaging().getToken();
      if (token) {
        setFcmToken(token);
      }
    } catch (error) {
      ToastService.error({ message: 'Failed!', description: 'Failed to register app with FCM' });
    }
  };

  const requestNotificationsPermission = async () => {
    try {
      await PermissionService.requestNotificationsPermission();
    } catch (error) {
      ToastService.error({
        message: 'Failed!',
        description:
          'Failed to request notifications permission, please grant permnission if you interested to get notifications',
      });
    }
  };

  // To request notifications permissions
  useEffect(() => {
    requestNotificationsPermission();
    dispatch.userStore.getUserData(accessToken);
    registerAppWithFCM();
  }, []);

  // To check avaiable tokens and add non existing tokens
  useEffect(() => {
    if (data && fcmToken && !data.fcmTokens.includes(fcmToken)) {
      dispatch.userStore.patchUserData({ fcmTokens: fcmToken });
    }
  }, [fcmToken]);

  return (
    // TODO::remove this BaseAuthScreen and wrap with relative component
    <BaseMainScreen>
      <View style={tw`m-auto`}>
        <Text style={tw`m-10`}>Home Screen</Text>
      </View>
    </BaseMainScreen>
  );
}
