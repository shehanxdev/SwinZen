import React from 'react';
import { Image, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { LinearGradientProps } from 'react-native-linear-gradient';

import { images } from '@sz/assets';
import { tw } from '@sz/config';
import { Color } from '@sz/constants';
import { useHeaderHeight } from '@sz/hooks';

interface BaseMainScreenScreenProps extends Partial<LinearGradientProps> {
  children: React.ReactNode;
}

export function BaseMainScreen({
  children,
  colors = [Color.Primary.SZ650, Color.Primary.Sz800, Color.Primary.Sz900],
  ...otherlinearGradientProps
}: BaseMainScreenScreenProps) {
  const headerHeight = useHeaderHeight();

  return (
    <LinearGradient {...otherlinearGradientProps} colors={colors} style={tw`relative flex-1`}>
      <Image source={images.grassBackground} style={tw`absolute opacity-10 h-screen w-screen`} resizeMode="cover" />
      <SafeAreaView style={tw`absolute h-full pt-[${headerHeight}px]`}>
        <KeyboardAvoidingView style={tw`flex-1`} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <ScrollView
            contentContainerStyle={[
              tw`grow`,
              //NOTE::There is an issue with the headerTransparent option with IOS devices which causes header height to be ingored by the content. This is a tempory workaround to get rid of that.
              { ...(Platform.OS === 'ios' && { marginTop: headerHeight }) },
            ]}
            keyboardShouldPersistTaps="handled">
            {children}
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}
