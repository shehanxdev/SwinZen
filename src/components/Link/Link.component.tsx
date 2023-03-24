import React from 'react';

import { Color, TextVariant } from '@sz/constants';

import { Text } from './../Typography';
import { LinkProps } from './Link.types';

export function Link({ onPress, testID, text, textColor = Color.Primary.Sz400, underline = false }: LinkProps) {
  return (
    <Text color={textColor} underline={underline} variant={TextVariant.Links} onPress={onPress} testID={testID}>
      {text}
    </Text>
  );
}
