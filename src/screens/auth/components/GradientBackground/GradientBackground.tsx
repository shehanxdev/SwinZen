import React, { PropsWithChildren } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { LinearGradientProps } from 'react-native-linear-gradient';

import { tw } from '@sz/config';

export interface GradientBackgroundProps extends Partial<LinearGradientProps>, PropsWithChildren {
  testID?: string;
}

export function GradientBackground({
  children,
  testID,
  colors = ['#113F17', '#070807'], //TODO:: update, these colours are NOT available within the design system
  ...otherlinearGradientProps
}: GradientBackgroundProps) {
  return (
    <LinearGradient {...otherlinearGradientProps} colors={colors} style={tw`flex-1`} testID={testID}>
      {children}
    </LinearGradient>
  );
}
