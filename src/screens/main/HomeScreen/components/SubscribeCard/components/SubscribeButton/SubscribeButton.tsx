import React from 'react';
import { TouchableOpacity } from 'react-native';

import { Text } from '@sz/components';
import { tw } from '@sz/config';
import { Color, TextAlignment, TextVariant } from '@sz/constants';

interface SubscribeButtonPropTypes {
  onPress(): void;
}

export function SubscribeButton({ onPress }: SubscribeButtonPropTypes) {
  return (
    //TODO::Outlined button variant is not available within the design system. This is a temporary workaround to use Outlined button.
    <TouchableOpacity onPress={onPress} style={tw`border border-Neutral-White w-36.5 rounded-7.5 justify-center h-10`}>
      <Text variant={TextVariant.Labels} textAlign={TextAlignment.Center} color={Color.Neutral.Sz100}>
        SUBSCRIBE
      </Text>
    </TouchableOpacity>
  );
}
