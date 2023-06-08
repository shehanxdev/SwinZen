import React from 'react';
import { ActivityIndicator, View } from 'react-native';

import { tw } from '@sz/config';
import { Color, SortDataType } from '@sz/constants';
import { useFetch } from '@sz/hooks';
import { VideoService } from '@sz/services';

import { BaseMainScreen } from '../../main/components';
import { GolfTipsWrapper } from '../components';

export function GolfTipsScreen() {
  const { isLoading, data } = useFetch(() => VideoService.getVideoCategories({ sortBy: SortDataType.UPDATED_DESCEND }));

  return (
    <BaseMainScreen>
      {isLoading ? (
        <View style={tw`flex-1`}>
          <ActivityIndicator size="small" color={Color.Neutral.White} />
        </View>
      ) : (
        <View style={tw`flex-1 mx-4 mt-6 mb-4`}>
          <GolfTipsWrapper golfTips={data?.results} />
        </View>
      )}
    </BaseMainScreen>
  );
}
