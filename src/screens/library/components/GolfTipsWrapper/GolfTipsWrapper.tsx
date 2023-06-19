import React from 'react';
import { View } from 'react-native';

import { tw } from '@sz/config';
import { Route } from '@sz/constants';
import { GolfTipDataType } from '@sz/models';
import { NavigationService } from '@sz/services';

import { GolfTipCard } from '../GolfTipCard';

interface GolfTipsWrapperProps {
  testID?: string;
  golfTips: GolfTipDataType[];
}

export function GolfTipsWrapper({ golfTips, testID }: GolfTipsWrapperProps) {
  return (
    <View style={tw`w-full flex-row flex-wrap justify-between gap-y-9 gap-x-1`} testID={testID}>
      {golfTips.map(item => {
        return (
          <GolfTipCard
            videosCount={item.videosCount}
            key={item.id}
            label={item.label}
            backgroundImage={item.backgroundImage}
            //TODO:: implement the navigation
            onPress={() => NavigationService.navigate(Route.GolfTipsPlaylist, { tipsCategory: item.label })}
          />
        );
      })}
    </View>
  );
}
