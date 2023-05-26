import React from 'react';
import { View } from 'react-native';

import { Text } from '@sz/components';
import { tw } from '@sz/config';
import { Color, TextVariant } from '@sz/constants';
import { BarSectionData } from '@sz/models';

import { BaseChartBar } from '../BaseChartBar/BaseChartBar';

/* NOTE :: This value defines the position of the sections label
 * This value should be equal to addition of top margin between the edge of the chart and the label + top value indicator notch height
 * ~= 12 + 36
 */
const SECTION_LABEL_TOP_MARGIN = 48;

type BaseResultsSectionProps = BarSectionData;

export function BaseResultsSection({ passes, fails, label }: BaseResultsSectionProps) {
  return (
    <View style={tw`flex flex-row justify-start`}>
      <BaseChartBar barValue={passes} chartBarType={'pass'} />
      <BaseChartBar barValue={fails} chartBarType={'fail'} />
      <View style={tw`absolute top-[-${SECTION_LABEL_TOP_MARGIN}px] inset-x-0`}>
        {/* TODO:: TextVatriant TextVariant.Labels size is too much, this will cause line breaks. Need to reduce the text sizes with a new textVariant or shorter labels*/}
        <Text variant={TextVariant.Labels} color={Color.Neutral.White}>
          {label}
        </Text>
      </View>
    </View>
  );
}
