import React from 'react';
import { TouchableOpacity } from 'react-native';

import { Text } from '@sz/components';
import { TextVariant } from '@sz/constants';

import { LinkProps } from './Link.types';

//TODO::add default values
export function Link({ onPress, testID, text, textColor, underline }: LinkProps) {
  return (
    <TouchableOpacity onPress={onPress} testID={testID}>
      <Text color={textColor} underline={underline} variant={TextVariant.Body1Regular}>
        {/* TODO::update variant after refactoring typography to have link variant  */}
        {text}
      </Text>
    </TouchableOpacity>
  );
}
