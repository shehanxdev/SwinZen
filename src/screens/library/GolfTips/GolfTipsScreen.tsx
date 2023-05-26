import React from 'react';
import { View } from 'react-native';

import { tw } from '@sz/config';

import { BaseLibraryScreen, GolfTipsWrapper } from '../components';
import { GolfTipsData } from './GolfTipsData';

export function GolfTipsScreen() {
  return (
    <BaseLibraryScreen>
      <View style={tw`flex-1 mx-4 mt-6`}>
        <GolfTipsWrapper golfTips={GolfTipsData} />
      </View>
    </BaseLibraryScreen>
  );
}
