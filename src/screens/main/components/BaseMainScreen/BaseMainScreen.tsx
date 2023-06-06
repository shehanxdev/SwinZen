import React from 'react';
import { Image, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView } from 'react-native';
import LinearGradient, { LinearGradientProps } from 'react-native-linear-gradient';

import { images } from '@sz/assets';
import { tw } from '@sz/config';
import { Color } from '@sz/constants';
import { useHeaderHeight } from '@sz/hooks';

interface BaseMainScreenScreenProps extends Partial<LinearGradientProps> {
  children: React.ReactNode;
  disableScrollView?: boolean;
}

export function BaseMainScreen({
  children,
  colors = [Color.Primary.Sz650, Color.Primary.Sz800, Color.Primary.Sz900],
  disableScrollView = false,
  ...otherlinearGradientProps
}: BaseMainScreenScreenProps) {
  const headerHeight = useHeaderHeight();

  return (
    <LinearGradient {...otherlinearGradientProps} colors={colors} style={tw`relative flex-1`}>
      <Image source={images.grassBackground} style={tw`absolute opacity-10 h-screen w-screen`} resizeMode="cover" />
      <SafeAreaView style={tw`h-full pt-[${headerHeight}px]`}>
        <KeyboardAvoidingView style={tw`flex-1`} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          {disableScrollView ? (
            children
          ) : (
            <ScrollView contentContainerStyle={tw`grow`} keyboardShouldPersistTaps="handled">
              {children}
            </ScrollView>
          )}
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}
