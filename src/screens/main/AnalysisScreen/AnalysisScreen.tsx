import React from 'react';
import { Text, View } from 'react-native';

import { tw } from '@sz/config';

import { BaseMainScreen } from '../components';

export function AnalysisScreen() {
  return (
    <BaseMainScreen>
      <View style={tw`m-auto`}>
        <Text style={tw`m-10`}>Analysis Screen</Text>
      </View>
    </BaseMainScreen>
  );
}
