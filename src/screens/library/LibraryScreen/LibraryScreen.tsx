import React, { useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

import { Text, ToggleSwitch } from '@sz/components';
import { tw } from '@sz/config';
import { Color, Route, SortDataType, TextVariant } from '@sz/constants';
import { useFetch } from '@sz/hooks';
import { NavigationService, VideoService } from '@sz/services';

import { TabScreenHeader } from '../../components';
import { BaseMainScreen } from '../../main/components';
import { GolfTipsWrapper } from '../components';
import { sliderData, toggleSwitchOptions } from './LibraryData';
import { LinksSlider } from './components';

type SwitchValueDataType = 'usingTheApp' | 'aboutSwingZen';

export function LibraryScreen() {
  const [switchValue, setSwitchValue] = useState<SwitchValueDataType>('usingTheApp');

  const { isLoading, data } = useFetch(() =>
    VideoService.getVideoCategories({ limit: 3, sortBy: SortDataType.UPDATED_DESCEND }),
  );

  return (
    <BaseMainScreen>
      <TabScreenHeader title="SwingZen university" />
      {isLoading ? (
        <View style={tw`flex-1`}>
          <ActivityIndicator size="small" color={Color.Neutral.White} />
        </View>
      ) : (
        <View style={tw`flex-1 mx-4 mt-6.25 mb-4`}>
          <ToggleSwitch
            options={toggleSwitchOptions}
            onChange={(value: SwitchValueDataType) => {
              setSwitchValue(value);
            }}
          />
          <View style={tw`mt-6.25`}>
            {switchValue === 'usingTheApp' ? <LinksSlider sliderData={sliderData.usingTheApp} /> : undefined}
            {switchValue === 'aboutSwingZen' ? <LinksSlider sliderData={sliderData.aboutSwingZen} /> : undefined}
          </View>
          <View style={tw`flex-row justify-between items-center pb-3`}>
            <Text variant={TextVariant.SubTitle2SemiBold} color={Color.Neutral.Sz100}>
              Golf tips
            </Text>
            <Text
              variant={TextVariant.Body2SemiBold}
              color={Color.Tertiary.Sz900}
              onPress={() => NavigationService.navigate(Route.GolfTips)}>
              See All
            </Text>
          </View>
          <GolfTipsWrapper golfTips={data?.results} />
        </View>
      )}
    </BaseMainScreen>
  );
}
