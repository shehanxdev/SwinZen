import React from 'react';
import { View } from 'react-native';

import { DownArrowIcon, Text, UpArrowIcon } from '@sz/components';
import { tw } from '@sz/config';
import { Color, TextAlignment, TextVariant } from '@sz/constants';
import { FaqSection } from '@sz/models';

interface FAQSectionHeaderPropTypes {
  content: FaqSection;
  index: number;
  isActive: boolean;
}

export function FAQSectionHeader({ content, isActive }: FAQSectionHeaderPropTypes) {
  return (
    <View style={tw`flex-row justify-between`} testID="FAQSectionHeaderTestID">
      <View style={tw`max-w-[90%]`}>
        <Text variant={TextVariant.Body2SemiBold} color={Color.Neutral.Sz100} textAlign={TextAlignment.Left}>
          {content.question}
        </Text>
      </View>
      {isActive ? <DownArrowIcon /> : <UpArrowIcon />}
    </View>
  );
}
