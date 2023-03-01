import React from 'react';
import { StatusBar, View } from 'react-native';

import { tw } from '@config';
import { Routes } from '@routes';

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
