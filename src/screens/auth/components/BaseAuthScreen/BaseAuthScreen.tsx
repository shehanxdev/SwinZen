import React from 'react';
import { Image, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { LinearGradientProps } from 'react-native-linear-gradient';

import { images } from '@sz/assets';
import { tw } from '@sz/config';
import { Color } from '@sz/constants';

interface BaseAuthScreenProps extends Partial<LinearGradientProps> {
  children: React.ReactNode;
}

export function BaseAuthScreen({
  children,
  colors = [Color.Primary.Sz650, Color.Primary.Sz800, Color.Primary.Sz900],
  ...otherlinearGradientProps
}: BaseAuthScreenProps) {
  return (
    <LinearGradient {...otherlinearGradientProps} colors={colors} style={tw`relative flex-1`}>
      <Image source={images.grassBackground} style={tw`absolute opacity-10 h-screen w-screen`} resizeMode="cover" />
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
