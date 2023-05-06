import React, { useMemo, useState } from 'react';
import { LayoutChangeEvent, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { FadeInDown, FadeOutDown } from 'react-native-reanimated';

import { Text } from '@sz/components';
import { tw } from '@sz/config';
import { Color, TextVariant } from '@sz/constants';

//NOTE::all the dimention values are in 'px' due to technical difficulties with dynamic height values
const CHART_DEFAULT_HEIGHT = 235;

//maximum value that can be use as passes/fails count for a specific month
const BAR_THRESHOLD_VALUE = 10;

const TOP_VALUE_INDICATOR_NOTCH_DIMENTIONS = {
  height: 36,
  width: 36,
};

const BAR_WIDTH = 36;

const LINEAR_GRADIENT_COLORS = {
  pass: [Color.Tertiary.Sz900, '#a2fd2f54', '#a2fd2f00'],
  fail: [Color.Secondary.Sz900, '#f658154d', '#f6581500'],
};

const TOP_VALUE_INDICATOR_NOTCH_ERROR_BOX_SHADOW_STYLES = {
  shadowColor: Color.Neutral.Black,
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.25,
  shadowRadius: 3,
};

const TOP_VALUE_INDICATOR_NOTCH_ERROR_POSITIONS = {
  top: -(TOP_VALUE_INDICATOR_NOTCH_DIMENTIONS.height / 2),
  height: TOP_VALUE_INDICATOR_NOTCH_DIMENTIONS.height,
  width: TOP_VALUE_INDICATOR_NOTCH_DIMENTIONS.width,
};

type ChartBarType = 'pass' | 'fail';

interface ChartBarProps {
  barValue: number; //TODO::shouldn't let any number. Need to restrict to less or equal than  10 as per the current requiment
  chartBarType: ChartBarType;
}

export function ChartBar({ barValue, chartBarType }: ChartBarProps) {
  {
    /*
     * This state is use as dynamic height for the chart as well as for the single bar based on it's pass/fail value.
     * It will adjust automatically based on the height same as the chart height which defined within the root component,
     * where the chart is being used.
     */
  }
  const [currentHeight, setCurrentHeight] = useState(CHART_DEFAULT_HEIGHT);

  const barVisibleHeight = useMemo(() => currentHeight * (barValue / BAR_THRESHOLD_VALUE), [barValue, currentHeight]);

  const onAnimatedViewLayout = (event: LayoutChangeEvent) => {
    var { height } = event.nativeEvent.layout;
    setCurrentHeight(height);
  };

  return (
    <Animated.View
      style={tw`items-end justify-end`}
      entering={FadeInDown.duration(500)}
      exiting={FadeOutDown.duration(500)}
      key={Math.random()}
      onLayout={onAnimatedViewLayout}>
      <View>
        <LinearGradient
          colors={chartBarType === 'pass' ? LINEAR_GRADIENT_COLORS.pass : LINEAR_GRADIENT_COLORS.fail}
          locations={[0, 0.48, 1]}
          style={{ height: barVisibleHeight, width: BAR_WIDTH }}
        />
        <View
          style={[
            tw`rounded-full justify-center absolute ${
              chartBarType === 'pass' ? 'bg-Neutral-White' : 'bg-Secondary-Sz900'
            }`,
            {
              ...(chartBarType === 'fail' && {
                ...TOP_VALUE_INDICATOR_NOTCH_ERROR_BOX_SHADOW_STYLES,
              }),
            },
            TOP_VALUE_INDICATOR_NOTCH_ERROR_POSITIONS,
          ]}>
          {/* TODO::font style not avaialble within the design system */}
          <Text
            variant={TextVariant.Body2SemiBold}
            color={chartBarType === 'pass' ? Color.Primary.Sz700 : Color.Neutral.White}>
            {barValue}
          </Text>
        </View>
      </View>
    </Animated.View>
  );
}
