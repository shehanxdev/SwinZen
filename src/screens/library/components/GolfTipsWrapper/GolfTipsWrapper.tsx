import React from 'react';
import { View } from 'react-native';

import { tw } from '@sz/config';
import { Route } from '@sz/constants';
import { VideoCatData } from '@sz/models';
import { NavigationService } from '@sz/services';
import { useSelector } from '@sz/stores';

import { GolfTipCard } from '../GolfTipCard';

interface GolfTipsWrapperProps {
  testID?: string;
  golfTips: Array<VideoCatData>;
}

export function GolfTipsWrapper({ golfTips, testID }: GolfTipsWrapperProps) {
  const userPlan = useSelector(state => state.userStore.userPlan);

  return (
    <View style={tw`w-full flex-row flex-wrap justify-between gap-y-9 gap-x-1`} testID={testID}>
      {golfTips?.map(item => {
        return (
          <GolfTipCard
            key={item.id}
            disabled={userPlan?.plan.price === 0} // TODO:: here we can add alert to inform user about paid plans, only paid uses can redirected to the video player screen
            videosCount={item.videos?.length}
            label={item.name}
            sourceUri={item.thumbnailUrl}
            onPress={() =>
              NavigationService.navigate(Route.GolfTipsPlaylist, { tipsCategory: item.name, tipsCategoryId: item.id })
            }
          />
        );
      })}
    </View>
  );
}
