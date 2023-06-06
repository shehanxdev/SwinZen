import React from 'react';
import { View } from 'react-native';

import { Text } from '@sz/components';
import { tw } from '@sz/config';
import { Color, TextVariant } from '@sz/constants';

export interface CircularScoreIndicatorProps {
  score: number;
  diameter: number;
}

export function CircularScoreIndicator({ score, diameter }: CircularScoreIndicatorProps) {
  return (
    <View
      style={tw`rounded-full bg-[${
        score > 5 ? Color.Primary.Sz700 : Color.Secondary.Sz900
      }] w-[${diameter}px] h-[${diameter}px] flex justify-center absolute bottom-0 left-0 shadow-md`}>
      <Text variant={TextVariant.SubTitle2SemiBold}>{score}</Text>
    </View>
  );
}
