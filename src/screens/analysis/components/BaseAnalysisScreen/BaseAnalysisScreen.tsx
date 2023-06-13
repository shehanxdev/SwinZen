import React from 'react';
import { SafeAreaView, ScrollView } from 'react-native';

import { tw } from '@sz/config';
import { useHeaderHeight } from '@sz/hooks';

//This component is needed since, Analysis screen has a different base screen
export function BaseAnalysisScreen({ children }) {
  const headerHeight = useHeaderHeight();

  return (
    <SafeAreaView style={tw`h-full pt-[${headerHeight}px] bg-Neutral-Sz900`}>
      <ScrollView contentContainerStyle={tw`grow`}>{children}</ScrollView>
    </SafeAreaView>
  );
}
