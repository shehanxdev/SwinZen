import React from 'react';
import { Pressable } from 'react-native';

import { Text } from '@sz/components';
import { tw } from '@sz/config';
import { Color, Route, TextVariant } from '@sz/constants';
import { NavigationService } from '@sz/services';

export interface HeaderRightLinkProps {
  text: string;
}

export function HeaderRightLink({ text }: HeaderRightLinkProps) {
  return (
    <Pressable
      onPress={() => NavigationService.navigate(Route.HowToShoot)}
      style={tw`bg-[${Color.Neutral.White}] w-38.5 h-7.5 rounded-2.5 justify-center`}>
      <Text variant={TextVariant.Body2SemiBold} color={Color.Primary.Sz700}>
        {text}
      </Text>
    </Pressable>
  );
}
