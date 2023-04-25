import React from 'react';
import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { LinearGradientProps } from 'react-native-linear-gradient';

import { tw } from '@sz/config';
import { useHeaderHeight } from '@sz/hooks';

interface BasePricePlansScreenProps extends Partial<LinearGradientProps> {
  children: React.ReactNode;
}

export function BasePricePlansScreen({
  children,
  colors = ['#113F17', '#070807'], //TODO:: update, these colours are NOT available within the design system
  ...otherlinearGradientProps
}: BasePricePlansScreenProps) {
  const headerHeight = useHeaderHeight();

  return (
    <LinearGradient {...otherlinearGradientProps} colors={colors} style={tw`h-full`}>
      <SafeAreaView style={tw`flex-1 pt-[${headerHeight}px]`}>
        <KeyboardAvoidingView style={tw`flex-1`} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <ScrollView contentContainerStyle={tw`grow`} keyboardShouldPersistTaps="handled">
            {children}
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}
