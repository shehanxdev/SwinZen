import React from 'react';
import { Image, SafeAreaView, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { LinearGradientProps } from 'react-native-linear-gradient';

import { images } from '@sz/assets';
import { tw } from '@sz/config';
import { Color } from '@sz/constants';
import { useHeaderHeight } from '@sz/hooks';

interface BaseLibraryScreenProps extends Partial<LinearGradientProps> {
  testID?: string;
  wrapWithScrollView?: boolean;
  children: React.ReactNode;
}

export function BaseLibraryScreen({
  children,
  testID,
  colors = [Color.Primary.SZ650, Color.Primary.Sz800, Color.Primary.Sz900],
  wrapWithScrollView = true,
  ...otherlinearGradientProps
}: BaseLibraryScreenProps) {
  const headerHeight = useHeaderHeight();

  const renderChildren = wrapWithScrollView ? (
    <ScrollView contentContainerStyle={tw`grow`} keyboardShouldPersistTaps="handled">
      {children}
    </ScrollView>
  ) : (
    children
  );

  return (
    <LinearGradient {...otherlinearGradientProps} colors={colors} style={tw`relative flex-1`}>
      <Image source={images.grassBackground} style={tw`absolute opacity-10 h-screen w-screen`} resizeMode="cover" />
      <SafeAreaView style={tw`h-full pt-[${headerHeight}px]`}>{renderChildren}</SafeAreaView>
    </LinearGradient>
  );
}
