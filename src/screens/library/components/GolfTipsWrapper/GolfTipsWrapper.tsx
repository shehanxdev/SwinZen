import React from 'react';
import { View } from 'react-native';

import { tw } from '@sz/config';

import { GolfTipCard } from '../GolfTipCard';

interface GolfTipsWrapperProps {
  golfTips: { id: number; videosCount: number; backgroundImage: string; label: string }[];
}

export function GolfTipsWrapper({ golfTips }: GolfTipsWrapperProps) {
  return (
    <View style={tw`mx-auto w-full flex-row flex-wrap justify-between gap-y-9`}>
      {golfTips.map(item => {
        return (
          <GolfTipCard
            videosCount={item.videosCount}
            key={item.id}
            label={item.label}
            backgroundImage={item.backgroundImage}
          />
        );
      })}
    </View>
  );
}
