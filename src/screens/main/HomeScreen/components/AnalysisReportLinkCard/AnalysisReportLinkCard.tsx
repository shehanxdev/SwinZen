import { BlurView } from '@react-native-community/blur';
import React from 'react';
import { Pressable, View } from 'react-native';

import { Link, RightArrowIcon, Text } from '@sz/components';
import { tw } from '@sz/config';
import { Color, TextAlignment, TextVariant } from '@sz/constants';

export function AnalysisReportLinkCard() {
  return (
    <Pressable
      onPress={() => {
        //TODO::implement
      }}
      style={({ pressed }) =>
        tw`border-[0.5px] h-[87px] border-[${
          Color.Neutral.Sz500
        }] rounded-[10px] flex-row justify-between items-center pl-4 pr-9 ${pressed ? 'opacity-90' : ''}`
      }>
      <BlurView
        blurType="light"
        blurAmount={5} //TODO:: Replace the magic number with a constant
        reducedTransparencyFallbackColor={Color.Neutral.Sz900}
        style={tw`absolute inset-x-0 inset-y-0 rounded-2.5`}
      />
      <View style={tw`max-w-[80%]`}>
        <Text variant={TextVariant.Body2Regular} textAlign={TextAlignment.Left}>
          Learn more about your progress. View your {}
          <Link underline textColor={Color.Primary.Sz400} text="Instant analysis report" />
        </Text>
      </View>
      <RightArrowIcon />
    </Pressable>
  );
}
