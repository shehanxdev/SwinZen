import React from 'react';
import { View } from 'react-native';

import { tw } from '@sz/config';

import { HeaderTitle } from '../../components';

export function RightHeaderTitle({ children }) {
  return (
    <View style={tw`flex-1 flex-row`}>
      <HeaderTitle>{children}</HeaderTitle>
    </View>
  );
}
