import React from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { LinearGradientProps } from 'react-native-linear-gradient';

import { tw } from '@sz/config';

interface WithBaseScreenProps extends Partial<LinearGradientProps> {
  BaseScreen: (props?: object) => JSX.Element;
}

/**
 * HOC to Wrap a provided screen with a linear gradient background, and other required components
 * TODO::modify this to add image with a gradient effect if needed
 */
export function withBaseScreen({
  BaseScreen,
  colors = ['#113F17', '#070807'], //TODO:: update, these colours are NOT available within the design system
  ...otherlinearGradientProps
}: WithBaseScreenProps) {
  return function ScreenWithBaseView(props?: object) {
    return (
      <LinearGradient {...otherlinearGradientProps} colors={colors} style={tw`h-full`}>
        <SafeAreaView style={tw`flex-1`}>
          <ScrollView contentContainerStyle={tw`grow`} keyboardShouldPersistTaps="handled">
            <BaseScreen {...props} />
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    );
  };
}
