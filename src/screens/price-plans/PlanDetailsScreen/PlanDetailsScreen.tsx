import React from 'react';
import { Text, View } from 'react-native';

import { tw } from '@sz/config';

import { BasePricePlansScreen } from '../components';

export function PlanDetailsScreen({ route }) {
  console.log('######', route);

  return (
    <BasePricePlansScreen testID="PlanDetailsScreenTestID">
      <View style={tw`m-auto`}>
        <Text style={tw`m-10 text-white`}>Plan Details Screen</Text>
      </View>
    </BasePricePlansScreen>
  );
}
