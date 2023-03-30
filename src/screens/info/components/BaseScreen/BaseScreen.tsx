import React from 'react';
import { ImageBackground, SafeAreaView, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { LinearGradientProps } from 'react-native-linear-gradient';

import { images } from '@sz/assets';
import { tw } from '@sz/config';
import { useHeaderHeight } from '@sz/hooks';

interface BaseScreenProps extends Partial<LinearGradientProps> {
  children: React.ReactNode;
  testID?: string;
}

export function BaseScreen({
  children,
  testID,
  colors = ['#8EFF0012', '#FFFFFF05', '#FFFFFF02'], //TODO:: update, these colours are NOT available within the design system
  ...otherlinearGradientProps
}: BaseScreenProps) {
  const headerHeight = useHeaderHeight();

  return (
    <ImageBackground testID={testID} style={tw`flex-1 pt-[${headerHeight}px]`} source={images.gradientBackground}>
      <SafeAreaView>
        <ScrollView>
          <LinearGradient
            useAngle
            angle={90}
            colors={colors}
            style={tw`mx-5 mt-8.5 mb-5 rounded-2.5 border border-neutral-700`}
            {...otherlinearGradientProps}>
            {children}
          </LinearGradient>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}
