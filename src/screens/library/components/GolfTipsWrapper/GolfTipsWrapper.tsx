import React from 'react';
import { View } from 'react-native';

import { tw } from '@sz/config';
import { GolfTipDataType } from '@sz/models';

import { GolfTipCard } from '../GolfTipCard';

interface GolfTipsWrapperProps {
  golfTips: GolfTipDataType[];
}

export function GolfTipsWrapper({ golfTips }: GolfTipsWrapperProps) {
  return (
    <View style={tw`w-full flex-row flex-wrap justify-between gap-y-9 gap-x-1`}>
      {golfTips.map(item => {
        return (
          <GolfTipCard
            videosCount={item.videosCount}
            key={item.id}
            label={item.label}
            backgroundImage={item.backgroundImage}
            //TODO:: implement the navigation
            onPress={() => console.log(`navigate to ${item.label} playlist screen`)}
          />
        );
      })}
    </View>
  );
}
