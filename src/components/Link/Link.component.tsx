import React from 'react';
import { TouchableOpacity } from 'react-native';

import { Text } from '@sz/components';
import { Color, TextVariant } from '@sz/constants';

import { LinkProps } from './Link.types';

export function Link({ onPress, testID, text, textColor = Color.Primary.Sz400, underline = true }: LinkProps) {
  return (
    <TouchableOpacity onPress={onPress} testID={testID}>
      <Text color={textColor} underline={underline} variant={TextVariant.Links}>
        {text}
      </Text>
    </TouchableOpacity>
  );
}
