import React from 'react';
import { Text, View } from 'react-native';

import { tw } from '@sz/config';

export function HomeScreen() {
  return (
    <View style={tw`m-auto`}>
      <Text style={tw`m-10`}>Home Screen</Text>
    </View>
  );
}
