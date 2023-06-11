import React from 'react';
import { Pressable } from 'react-native';

import { CrossIcon } from '@sz/components';
import { tw } from '@sz/config';
import { NavigationService } from '@sz/services';

export function HeaderRightCloseButton() {
  return (
    <Pressable onPress={() => NavigationService.goBack()} style={tw`py-2.5 pr-2.5`}>
      <CrossIcon />
    </Pressable>
  );
}
