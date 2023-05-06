import React from 'react';
import { View } from 'react-native';

import { tw } from '@sz/config';

export function BaseResultSectionDivider() {
  return <View style={tw`h-full w-[0.75px] bg-Neutral-Sz300`} />;
}
