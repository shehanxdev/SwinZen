import React from 'react';
import { Image, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { LinearGradientProps } from 'react-native-linear-gradient';

import { images } from '@sz/assets';
import { tw } from '@sz/config';
import { Color } from '@sz/constants';

interface BaseScreenProps extends Partial<LinearGradientProps> {
  children: React.ReactNode;
}

export function BaseScreen({
  children,
  colors = ['#1A5C23', Color.Primary.Sz800, Color.Primary.Sz900], //TODO:: update, these colours are NOT available within the design system
  ...otherlinearGradientProps
}: BaseScreenProps) {
  return (
    <LinearGradient {...otherlinearGradientProps} colors={colors} style={tw`relative flex-1`}>
      <Image source={images.grassBackground} style={tw`flex-1 opacity-10`} resizeMode="repeat" />
      <SafeAreaView style={tw`absolute h-full`}>
        <KeyboardAvoidingView style={tw`flex-1`} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <ScrollView contentContainerStyle={tw`grow`} keyboardShouldPersistTaps="handled">
            {children}
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}
