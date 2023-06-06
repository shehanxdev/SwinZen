import React from 'react';
import { Image, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, View } from 'react-native';
import LinearGradient, { LinearGradientProps } from 'react-native-linear-gradient';

import { images } from '@sz/assets';
import { LoadingIndicator } from '@sz/components';
import { tw } from '@sz/config';
import { Color } from '@sz/constants';
import { useHeaderHeight } from '@sz/hooks';

interface BaseMainScreenScreenProps extends Partial<LinearGradientProps> {
  children: React.ReactNode;
  isLoading?: boolean;
}

//TODO::remove redundant base screens and use a single one
export function BaseMainScreen({
  children,
  isLoading,
  colors = [Color.Primary.Sz650, Color.Primary.Sz800, Color.Primary.Sz900],
  ...otherlinearGradientProps
}: BaseMainScreenScreenProps) {
  const headerHeight = useHeaderHeight();

  return (
    <LinearGradient {...otherlinearGradientProps} colors={colors} style={tw`relative flex-1`}>
      <Image source={images.grassBackground} style={tw`absolute opacity-10 h-screen w-screen`} resizeMode="cover" />
      <SafeAreaView style={tw`h-full pt-[${headerHeight}px]`}>
        <KeyboardAvoidingView style={tw`flex-1`} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <ScrollView contentContainerStyle={tw`grow`} keyboardShouldPersistTaps="handled">
            {isLoading ? (
              <View style={tw`m-auto`}>
                <LoadingIndicator />
              </View>
            ) : (
              children
            )}
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}
