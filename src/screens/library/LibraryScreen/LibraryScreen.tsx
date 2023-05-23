import React, { useState } from 'react';
import { View } from 'react-native';

import { Text, ToggleSwitch } from '@sz/components';
import { tw } from '@sz/config';
import { Color, Route, TextVariant } from '@sz/constants';
import { NavigationService } from '@sz/services';

import { BaseLibraryScreen } from '../components';
import { golfTips, sliderData, toggleSwitchOptions } from './LibraryData';
import { GolfTipsWrapper, LinksSlider } from './components';

export function LibraryScreen() {
  const [switchValue, setSwitchValue] = useState('usingTheApp');

  return (
    <BaseLibraryScreen wrapWithScrollView={false}>
      <View style={tw`flex-1 mx-4 mt-6.25`}>
        <ToggleSwitch
          options={toggleSwitchOptions}
          onChange={value => {
            setSwitchValue(value);
          }}
        />
        <View style={tw`mt-6.25`}>
          <LinksSlider sliderData={switchValue === 'usingTheApp' ? sliderData.usingTheApp : sliderData.aboutSwingZen} />
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
        <GolfTipsWrapper golfTips={golfTips} />
      </View>
    </BaseLibraryScreen>
  );
}
