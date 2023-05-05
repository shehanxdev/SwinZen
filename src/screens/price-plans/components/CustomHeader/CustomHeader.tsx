import React from 'react';
import { GestureResponderEvent, Platform, TouchableOpacity, View } from 'react-native';

import { BackIcon, Text } from '@sz/components';
import { tw } from '@sz/config';
import { Color, TextVariant, headerTopMargin } from '@sz/constants';

export interface CustomHeaderProps {
  testID?: string;
  title: string;
  onBackPress: (event: GestureResponderEvent) => void;
}

export function CustomHeader({ testID = 'CustomHeaderTestID', title, onBackPress }: CustomHeaderProps) {
  const customMargin = Platform.OS === 'ios' ? 0 : headerTopMargin;

  return (
    <View testID={testID} style={tw`flex-row w-screen justify-between mt-[${customMargin}px]`}>
      <TouchableOpacity style={tw`px-4`} onPress={onBackPress}>
        <BackIcon />
      </TouchableOpacity>
      <Text variant={TextVariant.SubTitle2SemiBold} color={Color.Neutral.Sz100}>
        {title}
      </Text>
      <View style={tw`w-12`} />
    </View>
  );
}
