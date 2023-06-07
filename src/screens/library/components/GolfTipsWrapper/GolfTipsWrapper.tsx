import React from 'react';
import { View } from 'react-native';

import { tw } from '@sz/config';
import { VideoCatData } from '@sz/models';

import { GolfTipCard } from '../GolfTipCard';

interface GolfTipsWrapperProps {
  golfTips: Array<VideoCatData>;
}

export function GolfTipsWrapper({ golfTips }: GolfTipsWrapperProps) {
  return (
    <View style={tw`w-full flex-row flex-wrap justify-between gap-y-9 gap-x-1`}>
      {golfTips?.map(item => {
        return (
          <GolfTipCard
            key={item.name}
            videosCount={item.videos?.length}
            label={item.name}
            sourceUri={item.thumbnailUrl}
            //TODO:: implement the navigation
            onPress={() => console.log(`navigate to ${item.name} playlist screen`)}
          />
        );
      })}
    </View>
  );
}
