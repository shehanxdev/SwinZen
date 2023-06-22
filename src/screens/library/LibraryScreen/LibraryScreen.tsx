import React, { useState } from 'react';
import { View } from 'react-native';

import { Text, ToggleSwitch } from '@sz/components';
import { tw } from '@sz/config';
import {
  AboutSZInfo,
  Color,
  LibrarySliderData,
  Route,
  SortDataType,
  SubscriptionType,
  TextVariant,
  UTAInfo,
} from '@sz/constants';
import { useFetch } from '@sz/hooks';
import { NavigationService, VideoService } from '@sz/services';

import { BaseScreen, TabScreenHeader } from '../../components';
import { GolfTipsWrapper } from '../components';
import { toggleSwitchOptions } from './LibraryData';
import { LinksSlider } from './components';

type SwitchValueDataType = 'usingTheApp' | 'aboutSwingZen';

export function LibraryScreen() {
  const [switchValue, setSwitchValue] = useState<SwitchValueDataType>('usingTheApp');
  const getVideoCategoriesParams = {
    offset: 1,
    limit: 3,
    sortBy: SortDataType.UPDATED_DESCEND,
    subscriptionType: SubscriptionType.PAID,
  };

  const { isLoading, data } = useFetch(() => VideoService.getVideoCategories(getVideoCategoriesParams));

  return (
    <BaseScreen testID="LibraryScreenTestID" isLoading={isLoading}>
      <TabScreenHeader title="SwingZen university" />
      <View style={tw`flex-1 mx-4 mt-6.25 mb-4`}>
        <ToggleSwitch
          options={toggleSwitchOptions}
          onChange={(value: SwitchValueDataType) => {
            setSwitchValue(value);
          }}
        />
        <View style={tw`mt-6.25`}>
          {switchValue === 'usingTheApp' ? (
            <LinksSlider
              sliderData={LibrarySliderData.usingTheApp}
              onItemPress={item => {
                const index = LibrarySliderData.usingTheApp.flat().findIndex(value => value === item);
                NavigationService.navigate(Route.LibraryInfo, UTAInfo[index]);
              }}
            />
          ) : undefined}
          {switchValue === 'aboutSwingZen' ? (
            <LinksSlider
              sliderData={LibrarySliderData.aboutSwingZen}
              onItemPress={item => {
                const index = LibrarySliderData.aboutSwingZen.flat().findIndex(value => value === item);

                /**
                 * NOTE:
                 *  A separate screen is being used for the shooting setup
                 *  when LibrarySliderData.aboutSwingZen is flatten the index of shooting setup is 7
                 */
                if (index === 7) {
                  NavigationService.navigate(Route.ShootingSetup);
                  return;
                }
                NavigationService.navigate(Route.LibraryInfo, AboutSZInfo[index]);
              }}
            />
          ) : undefined}
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
        <GolfTipsWrapper golfTips={data} />
      </View>
    </BaseScreen>
  );
}
