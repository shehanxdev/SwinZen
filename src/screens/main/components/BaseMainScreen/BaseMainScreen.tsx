import React, { PropsWithChildren } from 'react';
import { ImageBackground, SafeAreaView, ScrollView } from 'react-native';

import { tw } from '@sz/config';

interface BaseMainScreenProps extends PropsWithChildren {
  testID?: string;
}

export function BaseMainScreen({ children, testID }: BaseMainScreenProps) {
  return (
    // TODO::This base screen has a tempory image background inorder to demonstrate the blured bottom tab bar. Replace with the correct backgroudn image when developing these screens
    <ImageBackground testID={testID} style={tw`flex-1`} source={require('./tempory-gradiant-background.png')}>
      <SafeAreaView>
        <ScrollView>{children}</ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}
