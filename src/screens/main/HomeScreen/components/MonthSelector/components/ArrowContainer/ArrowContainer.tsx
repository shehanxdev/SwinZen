import React, { PropsWithChildren } from 'react';
import { TouchableOpacity } from 'react-native';

import { tw } from '@sz/config';
import { Color } from '@sz/constants';

interface ArrowContainerProps extends PropsWithChildren {
  onArrowIconPress?: () => void;
  disabled?: boolean;
}

export function ArrowContainer({ children, onArrowIconPress, disabled = false }: ArrowContainerProps) {
  return (
    <TouchableOpacity
      testID="ArrowContainerComponentTestID"
      disabled={disabled}
      style={tw`h-7.5 w-7.5 rounded-full justify-center items-center bg-[${
        disabled ? Color.Neutral.Sz600 : '#1A5C23'
      }]`}
      onPress={onArrowIconPress}>
      {children}
    </TouchableOpacity>
  );
}
