import React, { PropsWithChildren } from 'react';
import { ImageBackground, SafeAreaView, ScrollView } from 'react-native';

import { images } from '@sz/assets';
import { tw } from '@sz/config';

interface BaseMainScreenProps extends PropsWithChildren {
  testID?: string;
}

export function BaseMainScreen({ children, testID }: BaseMainScreenProps) {
  return (
    <ImageBackground testID={testID} style={tw`flex-1`} source={images.gradientBackground}>
      <SafeAreaView>
        <ScrollView>{children}</ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}
