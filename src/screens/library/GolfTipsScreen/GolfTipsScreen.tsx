import React from 'react';
import { ActivityIndicator, View } from 'react-native';

import { tw } from '@sz/config';
import { Color, SortDataType, SubscriptionType } from '@sz/constants';
import { useFetch } from '@sz/hooks';
import { VideoService } from '@sz/services';

import { GolfTipsWrapper } from '../components';
import { BaseScreen } from './../../components';

export function GolfTipsScreen() {
  const getVideoCategoriesParams = {
    offset: 1, // TODO:: offset is not optional for the moment
    limit: 100, // TODO:: limit is not optional for the moment
    sortBy: SortDataType.UPDATED_DESCEND,
    subscriptionType: SubscriptionType.PAID,
  };
  const { isLoading, data } = useFetch(() => VideoService.getVideoCategories(getVideoCategoriesParams));

  return (
    <BaseScreen testID="GolfTipsScreenTestID" isLoading={isLoading}>
      {isLoading ? (
        <View style={tw`flex-1`}>
          <ActivityIndicator size="small" color={Color.Neutral.White} />
        </View>
      ) : (
        <View style={tw`flex-1 mx-4 mt-6 mb-4`}>
          <GolfTipsWrapper golfTips={data?.results} />
        </View>
      )}
    </BaseScreen>
  );
}
