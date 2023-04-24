import { BlurView } from '@react-native-community/blur';
import React from 'react';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { Link, RightArrowIcon, Text } from '@sz/components';
import { tw } from '@sz/config';
import { Color, TextAlignment, TextVariant } from '@sz/constants';

export function AnalysisReportLinkCard() {
  return (
    <TouchableOpacity
      onPress={() => {
        //TODO::implement
      }}
      style={tw`border h-[87px] border-Neutral-Sz500 rounded-2.5 overflow-hidden flex-row justify-between items-center pl-4 pr-9`}>
      <BlurView
        blurType="light"
        blurAmount={32} //TODO:: Replace the magic number with a constant
        reducedTransparencyFallbackColor={Color.Neutral.Sz900}
        style={tw`absolute inset-0 rounded-2.5`}
      />
      <View style={tw`max-w-[80%]`}>
        <Text variant={TextVariant.Body2Regular} textAlign={TextAlignment.Left}>
          Learn more about your progress. View your {}
          <Link underline textColor={Color.Primary.Sz400} text="Instant analysis report" />
        </Text>
      </View>
      <RightArrowIcon />
    </TouchableOpacity>
  );
}
