import React from 'react';
import { TouchableOpacity } from 'react-native';

import { BackIcon } from '@sz/components';
import { tw } from '@sz/config';
import { NavigationService } from '@sz/services';

export function HeaderLeft() {
  return (
    <TouchableOpacity
      onPress={() => NavigationService.goBack()}
      /* NOTE:: This padding provides more area for onPress event*/
      style={tw`py-2.5 pr-2.5`}>
      <BackIcon />
    </TouchableOpacity>
  );
}
