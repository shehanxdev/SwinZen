import React from 'react';
import { Text, View } from 'react-native';

import { tw } from '@sz/config';

import { BaseAuthScreen } from './../../../screens/auth/components';

export function HomeScreen() {
  return (
    // TODO::remove this BaseAuthScreen and wrap with relative component
    <BaseAuthScreen>
      <View style={tw`m-auto`}>
        <Text style={tw`m-10`}>Home Screen</Text>
      </View>
    </BaseAuthScreen>
  );
}
