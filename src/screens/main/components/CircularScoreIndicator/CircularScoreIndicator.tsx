import React from 'react';
import { View } from 'react-native';

import { Text } from '@sz/components';
import { tw } from '@sz/config';
import { Color, TextVariant } from '@sz/constants';

export type ScoreCardSize = 'small' | 'large';

export interface CircularScoreIndicatorProps {
  score: number;
  size: ScoreCardSize;
}

export function CircularScoreIndicator({ score, size }: CircularScoreIndicatorProps) {
  return (
    <View
      style={tw`rounded-full bg-[${score > 5 ? Color.Primary.Sz700 : Color.Secondary.Sz900}] ${
        size == 'small' ? 'h-10 w-10' : 'h-15 w-15'
      }  flex justify-center absolute bottom-0 left-0 shadow-md`}>
      <Text variant={TextVariant.SubTitle2SemiBold}>{score}</Text>
    </View>
  );
}
