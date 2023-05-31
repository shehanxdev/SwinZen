import React from 'react';
import { Pressable } from 'react-native';

import { Text } from '@sz/components';
import { tw } from '@sz/config';
import { Color, TextVariant } from '@sz/constants';

export interface HeaderRightLinkProps {
  text: string;
}

export function HeaderRightLink({ text }: HeaderRightLinkProps) {
  return (
    <Pressable
      onPress={() => console.log('handle the navigation')} //TODO:: Implement the navigation
      style={tw`bg-[${Color.Neutral.White}] w-38.5 h-7.5 rounded-2.5 justify-center`}>
      <Text variant={TextVariant.Body2SemiBold} color={Color.Primary.Sz700}>
        {text}
      </Text>
    </Pressable>
  );
}
