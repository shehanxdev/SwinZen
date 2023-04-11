import React from 'react';
import { Text, View } from 'react-native';

import { tw } from '@sz/config';

import { BasePricePlansScreen } from '../components';

export function PricePlansScreen() {
  return (
    <BasePricePlansScreen>
      <View style={tw`m-auto`}>
        <Text style={tw`m-10`}>Price Plans Screen</Text>
      </View>
    </BasePricePlansScreen>
  );
}
