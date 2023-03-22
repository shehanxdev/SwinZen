import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { LinearGradientProps } from 'react-native-linear-gradient';

import { tw } from '@sz/config';

interface GradientBackgroundHOCProps extends Partial<LinearGradientProps> {
  BaseScreen: (props?: object) => JSX.Element;
}

/**
 * HOC to Wrap a provided screen with a linear gradient background.
 */
export function withGradientBackground({
  BaseScreen,
  colors = ['#113F17', '#070807'], //TODO:: update, NOT available within the design system
  ...otherlinearGradientProps
}: GradientBackgroundHOCProps) {
  return function ScreenWithGradientBackground(props?: object) {
    return (
      <LinearGradient {...otherlinearGradientProps} colors={colors} style={tw`flex-1`}>
        <BaseScreen {...props} />
      </LinearGradient>
    );
  };
}
