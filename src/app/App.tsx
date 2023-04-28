import React from 'react';
import { StatusBar, View } from 'react-native';
import 'react-native-gesture-handler';

import { ToastHost } from '@sz/components';
import { tw } from '@sz/config';
import { Routes } from '@sz/routes';

export function App() {
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
