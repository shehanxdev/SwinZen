import React, { useMemo } from 'react';
import { View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { FadeInDown, FadeOutDown } from 'react-native-reanimated';

import { Text } from '@sz/components';
import { tw } from '@sz/config';
import { Color, TextVariant } from '@sz/constants';

const MAX_HEIGHT = 235;
const TOP_VALUE_INDICATOR_NOTCH_HEIGHT = 36;

type ChartBarType = 'pass' | 'fail';

interface ChartBarProps {
  barValue: number; //TODO::shouldn't let any number. Need to restrict to less or equal than  20 as per the current requiment
  chartBarType: ChartBarType;
}

export function ChartBar({ barValue, chartBarType }: ChartBarProps) {
  const visibleHeight = useMemo(() => MAX_HEIGHT * (barValue / 20), [barValue]);

  return (
    <Animated.View
      style={[tw`items-end justify-end`]}
      key={'uniqueKey'} //TODO::update
      entering={FadeInDown.duration(500)}
      exiting={FadeOutDown.duration(500)}>
      <View>
        <LinearGradient
          colors={
            chartBarType === 'pass' ? ['#A2FD2F', '#a2fd2f54', '#a2fd2f00'] : ['#F65815', '#f658154d', '#f6581500']
          } //TODO :: these colors are not in the design system
          locations={[0, 0.48, 1]} //TODO::check figma on break points
          style={[tw`m-auto h-58.75 w-9 relative`, { height: visibleHeight }]}></LinearGradient>
        <View
          style={[
            tw`rounded-full z-1 absolute ${chartBarType === 'pass' ? 'bg-Neutral-White' : 'bg-Secondary-Sz900'}`,
            {
              // TODO::update box shadow
              top: -TOP_VALUE_INDICATOR_NOTCH_HEIGHT / 2,
              height: TOP_VALUE_INDICATOR_NOTCH_HEIGHT, //TODO::add object
              width: TOP_VALUE_INDICATOR_NOTCH_HEIGHT,
              shadowColor: '#171717',
              shadowOffset: { width: -2, height: 4 },
              shadowOpacity: 0.2,
              shadowRadius: 3,
              justifyContent: 'center',
            },
          ]}>
          {/* TODO::font style not avaialble within the design system */}
          <Text
            variant={TextVariant.Body2SemiBold}
            color={chartBarType === 'pass' ? Color.Primary.Sz700 : Color.Neutral.White}>
            {/* TODO::Remove hardcoded values */}
            10
          </Text>
        </View>
      </View>
    </Animated.View>
  );
}
