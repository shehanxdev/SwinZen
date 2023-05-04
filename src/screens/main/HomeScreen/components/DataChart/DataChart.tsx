import React from 'react';
import { Text, View } from 'react-native';

import { tw } from '@sz/config';

export function DataChart() {
  return (
    <View style={[tw`m-auto h-58.75 w-full`, { backgroundColor: 'red' }]}>
      <Text style={tw`m-10`}>data chart</Text>
    </View>
  );
}
