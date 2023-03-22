import React, { PropsWithChildren } from 'react';
import { Image, SafeAreaView } from 'react-native';
// eslint-disable-next-line import/no-extraneous-dependencies
import LinearGradient from 'react-native-linear-gradient';

import { tw } from '@sz/config';

import { IMAGES } from '../../../../assets/images';
import { GradientBackgroundProps } from './GradientBackground.types';

export function GradientBackground({ testID, children }: PropsWithChildren<GradientBackgroundProps>) {
  return (
    <LinearGradient testID={testID} colors={['#1A5C23', '#0C1E0F', '#070707']} style={tw`relative flex-1`}>
      <Image source={IMAGES.grassBg} style={tw`opacity-10`} resizeMode="repeat" />
      <SafeAreaView style={tw`absolute w-screen h-screen`}>{children}</SafeAreaView>
    </LinearGradient>
  );
}
