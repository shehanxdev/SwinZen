import messaging from '@react-native-firebase/messaging';
import React, { useEffect } from 'react';
import { StatusBar, View } from 'react-native';
import 'react-native-gesture-handler';

import { ToastHost } from '@sz/components';
import { tw } from '@sz/config';
import { Routes } from '@sz/routes';
import { useDispatch, useSelector } from '@sz/stores';

export function App() {
  const dispatch = useDispatch();

  const isAppReady = useSelector(state => state.appStore.isAppReady);

  // Subscribe foreground state messages handler
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      //TODO:: should save these notifications in local storage
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    dispatch.appStore.initializeApp().catch(console.error);

    return unsubscribe;
  }, []);

  return (
    <>
      <StatusBar barStyle="light-content" />
      <View style={tw`flex-1`}>
        {/* TODO: Add common background and loading indicator while the app is initilizing */}
        {isAppReady ? <Routes /> : null}
        <ToastHost />
      </View>
    </>
  );
}

export default App;
