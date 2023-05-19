import messaging from '@react-native-firebase/messaging';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

import { tw } from '@sz/config';
import { PermissionService } from '@sz/services';
import { useDispatch, useSelector } from '@sz/stores';

import { BaseMainScreen } from '../components';

export function HomeScreen() {
  const [fcmToken, setFcmToken] = useState(null);
  const dispatch = useDispatch();

  const accessToken = useSelector(state => state.userStore.accessToken);
  const data = useSelector(state => state.userStore.userData);

  // firebase device registration and store fcm token
  const registerAppWithFCM = async () => {
    await messaging()
      .getToken()
      .then(token => {
        if (token) {
          setFcmToken(token);
        }
      });
  };

  // To request notifications permissions
  useEffect(() => {
    //TODO::add proper error pop up to the user
    PermissionService.requestNotificationsPermission().catch(console.error);
    dispatch.userStore.getUserData(accessToken);
    registerAppWithFCM();
  }, []);

  // To check avaiable tokens and add non existing tokens
  useEffect(() => {
    if (data) {
      const userData = data.fcmTokens &&
        !data.fcmTokens.includes(fcmToken) && { fcmTokens: [...data.fcmTokens, fcmToken] };
      dispatch.userStore.patchUserData(userData);
    }
  }, [data]);

  return (
    // TODO::remove this BaseAuthScreen and wrap with relative component
    <BaseMainScreen>
      <View style={tw`m-auto`}>
        <Text style={tw`m-10`}>Home Screen</Text>
      </View>
    </BaseMainScreen>
  );
}
