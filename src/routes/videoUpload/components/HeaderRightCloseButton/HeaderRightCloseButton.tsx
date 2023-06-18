import React from 'react';
import { Pressable } from 'react-native';

import { CrossIcon } from '@sz/components';
import { NavigationService } from '@sz/services';

export function HeaderRightCloseButton() {
  return (
    <Pressable onPress={() => NavigationService.goBack()}>
      <CrossIcon />
    </Pressable>
  );
}
