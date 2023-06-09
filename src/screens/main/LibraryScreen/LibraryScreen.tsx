import React, { useState } from 'react';
import { View } from 'react-native';

import { Text, ToggleSwitch } from '@sz/components';
import { tw } from '@sz/config';
import { Color, LibrarySliderData, Route, TextVariant } from '@sz/constants';
import { NavigationService } from '@sz/services';

import { BaseScreen } from '../../components';
import { GolfTipsWrapper } from '../../library/components';
import { golfTips, toggleSwitchOptions } from './LibraryData';
import { LinksSlider } from './components';

type SwitchValueDataType = 'usingTheApp' | 'aboutSwingZen';

export function LibraryScreen() {
  const [switchValue, setSwitchValue] = useState<SwitchValueDataType>('usingTheApp');

  return (
    <BaseScreen testID="LibraryScreenTestID">
      <View style={tw`flex-1 mx-4 mt-6.25 mb-4`}>
        <ToggleSwitch
          options={toggleSwitchOptions}
          onChange={(value: SwitchValueDataType) => {
            setSwitchValue(value);
          }}
        />
        <View style={tw`mt-6.25`}>
          {switchValue === 'usingTheApp' ? <LinksSlider sliderData={LibrarySliderData.usingTheApp} /> : undefined}
          {switchValue === 'aboutSwingZen' ? <LinksSlider sliderData={LibrarySliderData.aboutSwingZen} /> : undefined}
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
    </BaseScreen>
  );
}
