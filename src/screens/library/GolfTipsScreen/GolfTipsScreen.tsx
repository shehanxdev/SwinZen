import React from 'react';
import { View } from 'react-native';

import { tw } from '@sz/config';

import { GolfTipsWrapper } from '../components';
import { BaseScreen } from './../../components';
import { GolfTipsData } from './GolfTipsData';

export function GolfTipsScreen() {
  return (
    <BaseScreen testID="GolfTipsScreenTestID">
      <View style={tw`flex-1 mx-4 mt-6 mb-4`}>
        <GolfTipsWrapper golfTips={GolfTipsData} />
      </View>
    </BaseScreen>
  );
}
