import React, { useCallback } from 'react';
import { View } from 'react-native';

import { tw } from '@sz/config';
import { SortDataType, SubscriptionType } from '@sz/constants';
import { usePaginatedDataSource } from '@sz/hooks';
import { VideoCatData } from '@sz/models';
import { VideoService } from '@sz/services';

import { GolfTipsWrapper } from '../components';
import { BaseScreen } from './../../components';

const VIDEO_CATEGORIES_PAGINATION_PAGE_SIZE = 100;

export function GolfTipsScreen() {
  const fetchData = (page: number) => {
    const getVideoCategoriesParams = {
      offset: page,
      limit: VIDEO_CATEGORIES_PAGINATION_PAGE_SIZE,
      sortBy: SortDataType.UPDATED_DESCEND,
      subscriptionType: SubscriptionType.PAID,
    };
    return VideoService.getVideoCategories(getVideoCategoriesParams);
  };

  const keyExtractor = useCallback((item: VideoCatData) => item.id.toString(), []);

  const { isLoading, data } = usePaginatedDataSource(fetchData, keyExtractor);

  return (
    <BaseScreen testID="GolfTipsScreenTestID" isLoading={isLoading}>
      <View style={tw`flex-1 mx-4 mt-6 mb-4`}>
        <GolfTipsWrapper golfTips={data} />
      </View>
    </BaseScreen>
  );
}
