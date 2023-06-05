import React, { useState } from 'react';
import { View } from 'react-native';

import { Text, ToggleSwitch } from '@sz/components';
import { tw } from '@sz/config';
import { Color, Route, TextVariant } from '@sz/constants';
import { NavigationService } from '@sz/services';

import { BaseMainScreen } from '../../main/components';
import { GolfTipsWrapper } from '../components';
import { golfTips, sliderData, toggleSwitchOptions } from './LibraryData';
import { LinksSlider } from './components';

type SwitchValueDataType = 'usingTheApp' | 'aboutSwingZen';

export function LibraryScreen() {
  const [switchValue, setSwitchValue] = useState<SwitchValueDataType>('usingTheApp');

  return (
    <BaseMainScreen>
      <View style={tw`flex-1 mx-4 mt-6.25`}>
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
        <GolfTipsWrapper golfTips={golfTips} />
      </View>
    </BaseMainScreen>
  );
}
