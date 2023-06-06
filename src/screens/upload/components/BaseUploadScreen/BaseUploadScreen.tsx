import React, { PropsWithChildren } from 'react';
import { ImageBackground, SafeAreaView, ScrollView } from 'react-native';

import { images } from '@sz/assets';
import { tw } from '@sz/config';
import { useHeaderHeight } from '@sz/hooks';

interface BaseMainScreenProps extends PropsWithChildren {
  testID?: string;
  isSetupScreen?: boolean;
}

export function BaseUploadScreen({ children, testID, isSetupScreen = false }: BaseMainScreenProps) {
  const headerHeight = useHeaderHeight();

  return (
    <ImageBackground
      testID={testID}
      style={tw`flex-1`}
      source={isSetupScreen ? images.videoSetupBackground : images.gradientBackground}>
      <SafeAreaView style={tw`h-full pt-[${headerHeight}px]`}>
        <ScrollView contentContainerStyle={tw`grow`}>{children}</ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}
