import { BlurView } from '@react-native-community/blur';
import React from 'react';
import { View } from 'react-native';

import { RightArrowIcon, Text } from '@sz/components';
import { tw } from '@sz/config';
import { Color, TextAlignment, TextVariant } from '@sz/constants';

export function AnalysisReportLinkCard() {
  return (
    <View
      style={tw`border-[0.5px] h-[87px] border-[${Color.Neutral.Sz500}] rounded-lg flex-row justify-between px-5 items-center py-4`}>
      <BlurView
        blurType="dark"
        blurAmount={10}
        reducedTransparencyFallbackColor={Color.Neutral.Sz900}
        style={tw`absolute inset-x-0 inset-y-0 rounded-2.5`}
      />
      <View style={tw`pr-6`}>
        <Text variant={TextVariant.Body2Regular} textAlign={TextAlignment.Left}>
          Learn more about your progress. View your{''}
          <Text variant={TextVariant.Links} underline color={Color.Primary.Sz400}>
            Instant analysis report
          </Text>
        </Text>
      </View>
      <View style={tw`pr-2`}>
        <RightArrowIcon />
      </View>
    </View>
  );
}
