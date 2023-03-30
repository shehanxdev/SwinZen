import React from 'react';
import { Text, View } from 'react-native';

import { tw } from '@sz/config';

import { BaseMainScreen } from '../components';

export function LibraryScreen() {
  return (
    <BaseMainScreen>
      <View style={tw`m-auto`}>
        <Text style={tw`m-10`}>Library Screen</Text>
      </View>
    </BaseMainScreen>
  );
}
