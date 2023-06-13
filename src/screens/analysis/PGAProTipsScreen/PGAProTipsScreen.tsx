import React from 'react';
import { Text, View } from 'react-native';

import { tw } from '@sz/config';

import { BaseScreen } from '../../components';

export function PGAProTipsScreen() {
  return (
    <BaseScreen>
      <View style={tw`m-auto`}>
        <Text style={tw`m-10 text-white`}>PGA Pro Tips Screen</Text>
      </View>
    </BaseScreen>
  );
}
