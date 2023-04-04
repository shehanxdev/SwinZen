import React from 'react';
import { StatusBar, View } from 'react-native';
import 'react-native-gesture-handler';

import { tw } from '@sz/config';
import { Routes } from '@sz/routes';

export function App() {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <View style={tw`flex-1`}>
        <Routes />
      </View>
    </>
  );
}

export default App;
