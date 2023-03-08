import React from 'react';
import { StatusBar, View } from 'react-native';

import { tw } from '@sz/config';
import { Routes } from '@sz/routes';

export function App() {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <View style={tw`h-full`}>
        <Routes />
      </View>
    </>
  );
}

export default App;
