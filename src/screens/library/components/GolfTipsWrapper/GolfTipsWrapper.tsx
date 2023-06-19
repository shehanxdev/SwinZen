import React from 'react';
import { View } from 'react-native';

import { tw } from '@sz/config';
import { Route } from '@sz/constants';
import { VideoCatData } from '@sz/models';
import { NavigationService } from '@sz/services';

import { GolfTipCard } from '../GolfTipCard';

interface GolfTipsWrapperProps {
  testID?: string;
  golfTips: Array<VideoCatData>;
}

export function GolfTipsWrapper({ golfTips, testID }: GolfTipsWrapperProps) {
  return (
    <View style={tw`w-full flex-row flex-wrap justify-between gap-y-9 gap-x-1`} testID={testID}>
      {golfTips?.map(item => {
        return (
          <GolfTipCard
            key={item.name}
            videosCount={item.videos?.length}
            label={item.name}
            sourceUri={item.thumbnailUrl}
            //TODO:: implement the navigation
            onPress={() => NavigationService.navigate(Route.GolfTipsPlaylist, { tipsCategory: item.name })}
          />
        );
      })}
    </View>
  );
}
