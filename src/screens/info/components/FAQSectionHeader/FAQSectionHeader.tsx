import React from 'react';
import { View } from 'react-native';

import { DownArrowIcon, Text, UpArrowIcon } from '@sz/components';
import { tw } from '@sz/config';
import { Color, TextAlignment, TextVariant } from '@sz/constants';

export function FAQSectionHeader(section, _, isActive) {
  return (
    <View style={tw`flex-row justify-between`}>
      <View style={tw`max-w-[90%]`}>
        <Text variant={TextVariant.Body2SemiBold} color={Color.Neutral.Sz100} textAlign={TextAlignment.Left}>
          {section.title}
        </Text>
      </View>
      {isActive ? <DownArrowIcon /> : <UpArrowIcon />}
    </View>
  );
}
