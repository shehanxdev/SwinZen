import React from 'react';
import { TouchableOpacity } from 'react-native';

import { Text } from '@sz/components';
import { tw } from '@sz/config';
import { Color, TextAlignment, TextVariant } from '@sz/constants';

export function SubscribeButton() {
  return (
    //TODO:: To be refactored once the button is available in the design system
    <TouchableOpacity
      style={tw`border-[1px] border-[${Color.Neutral.White}] bg-[${Color.Transparency.full}] mt-[72px] w-[146px] rounded-[30px] py-[8px]`}>
      <Text variant={TextVariant.Body1SemiBold} textAlign={TextAlignment.Center} color={Color.Neutral.Sz100}>
        SUBSCRIBE
      </Text>
    </TouchableOpacity>
  );
}
