import React from 'react';
import { View } from 'react-native';

import { tw } from '@sz/config';

import { BaseMainScreen } from '../../main/components';
import { GolfTipsWrapper } from '../components';
import { GolfTipsData } from './GolfTipsData';

export function GolfTipsScreen() {
  return (
    <BaseMainScreen>
      <View style={tw`flex-1 mx-4 mt-6`}>
        <GolfTipsWrapper golfTips={GolfTipsData} />
      </View>
    </BaseMainScreen>
  );
}
