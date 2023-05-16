import messaging from '@react-native-firebase/messaging';
import React, { useEffect } from 'react';
import { StatusBar, View } from 'react-native';
import 'react-native-gesture-handler';

import { ToastHost } from '@sz/components';
import { tw } from '@sz/config';
import { Routes } from '@sz/routes';

export function App() {
  // Subscribe foreground state messages handler
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      //TODO:: should save these notifications in local storage
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });
    return unsubscribe;
  }, []);

  return (
    <>
      <StatusBar barStyle="light-content" />
      <View style={tw`flex-1`}>
        <Routes />
        <ToastHost />
      </View>
    </>
  );
}

export default App;
