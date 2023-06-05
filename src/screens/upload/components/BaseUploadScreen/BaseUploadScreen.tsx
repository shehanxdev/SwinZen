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
  const backgroundStyle = isSetupScreen ? tw`flex-1` : tw`h-full pt-[${headerHeight}px bg-Neutral-Sz900`;

  return (
    <ImageBackground
      testID={testID}
      style={backgroundStyle}
      source={isSetupScreen ? images.videoSetupBackground : undefined}>
      <SafeAreaView style={tw`h-full pt-[${headerHeight}px]`}>
        <ScrollView contentContainerStyle={tw`grow`}>{children}</ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}
