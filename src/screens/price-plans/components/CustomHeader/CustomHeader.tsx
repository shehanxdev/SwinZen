import React from 'react';
import { GestureResponderEvent, TouchableOpacity, View } from 'react-native';

import { BackIcon, Text } from '@sz/components';
import { tw } from '@sz/config';
import { Color, TextVariant } from '@sz/constants';
import { useHeaderHeight } from '@sz/hooks';

export interface CustomHeaderProps {
  testID?: string;
  title: string;
  onBackPress: (event: GestureResponderEvent) => void;
}

export function CustomHeader({ testID = 'CustomHeaderTestID', title, onBackPress }: CustomHeaderProps) {
  const headerHeight = useHeaderHeight();

  return (
    <View testID={testID} style={tw`flex-row h-[${headerHeight}] w-screen justify-between`}>
      <TouchableOpacity style={tw`px-4.5`} onPress={onBackPress}>
        <BackIcon />
      </TouchableOpacity>
      <Text variant={TextVariant.SubTitle2SemiBold} color={Color.Neutral.Sz100}>
        {title}
      </Text>
      <View />
    </View>
  );
}
