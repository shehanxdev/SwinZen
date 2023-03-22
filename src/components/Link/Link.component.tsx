import React from 'react';

import { Text } from '@sz/components';
import { Color, TextVariant } from '@sz/constants';

import { LinkProps } from './Link.types';

//TODO::add fade effect in clicked state
export function Link({ onPress, testID, text, textColor = Color.Primary.Sz400, underline = false }: LinkProps) {
  return (
    <Text color={textColor} underline={underline} variant={TextVariant.Links} onPress={onPress} testID={testID}>
      {text}
    </Text>
  );
}
