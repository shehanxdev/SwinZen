import React from 'react';
import { Text, View } from 'react-native';

import { tw } from '@sz/config';

import { BaseScreen } from './../../components';

export function VideosScreen() {
  return (
    <BaseScreen>
      <View style={tw`m-auto`}>
        <Text style={tw`m-10`}>Videos Screen</Text>
      </View>
    </BaseScreen>
  );
}
