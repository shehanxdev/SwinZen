import React, { Ref } from 'react';
import { Image, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, View } from 'react-native';
import LinearGradient, { LinearGradientProps } from 'react-native-linear-gradient';

import { images } from '@sz/assets';
import { LoadingIndicator } from '@sz/components';
import { tw } from '@sz/config';
import { Color } from '@sz/constants';
import { useHeaderHeight } from '@sz/hooks';

export interface BaseScreenProps extends Partial<LinearGradientProps> {
  children: React.ReactNode;
  wrapWithScrollView?: boolean;
  isLoading?: boolean; //Use this prop to activate the full screen loading effect
  scrollRef?: Ref<ScrollView>;
}

export function BaseScreen({
  children,
  colors = [Color.Primary.Sz650, Color.Primary.Sz800, Color.Primary.Sz900],
  wrapWithScrollView = true,
  isLoading,
  scrollRef,
  ...otherlinearGradientProps
}: BaseScreenProps) {
  const headerHeight = useHeaderHeight();

  const renderChildren = wrapWithScrollView ? (
    <ScrollView contentContainerStyle={tw`grow`} keyboardShouldPersistTaps="handled" ref={scrollRef}>
      {children}
    </ScrollView>
  ) : (
    children
  );

  return (
    <LinearGradient {...otherlinearGradientProps} colors={colors} style={tw`relative flex-1`}>
      <Image source={images.grassBackground} style={tw`absolute opacity-10 h-screen w-screen`} resizeMode="cover" />
      <SafeAreaView style={tw`h-full pt-[${headerHeight}px]`}>
        <KeyboardAvoidingView style={tw`flex-1`} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          {isLoading ? (
            <View style={tw`m-auto`}>
              <LoadingIndicator />
            </View>
          ) : (
            renderChildren
          )}
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}
