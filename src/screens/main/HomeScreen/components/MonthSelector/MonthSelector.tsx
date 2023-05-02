import React from 'react';
import { View } from 'react-native';

import { MoveLeftArrowIcon, MoveRightArrowIcon, Text } from '@sz/components';
import { tw } from '@sz/config';
import { Color, TextVariant } from '@sz/constants';

import { ArrowContainer } from './components/ArrowContainer';

interface MonthSelectorProps {
  disabled?: boolean; //This prop is use to handle the edge case for free tier users
}

export function MonthSelector({ disabled = false }: MonthSelectorProps) {
  return (
    <View style={tw`flex flex-row h-18 justify-between items-center px-4`}>
      <ArrowContainer
        onArrowIconPress={() => {
          // TODO:: Implement
        }}>
        <MoveLeftArrowIcon />
      </ArrowContainer>
      <Text variant={TextVariant.SubTitle2SemiBold} color={disabled ? Color.Neutral.Sz600 : ('#1A5C23' as Color)}>
        JUNE 2022
      </Text>
      <ArrowContainer
        onArrowIconPress={() => {
          // TODO::Implement
        }}>
        <MoveRightArrowIcon />
      </ArrowContainer>
    </View>
  );
}
