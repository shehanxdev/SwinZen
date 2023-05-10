import dayjs from 'dayjs';
import React, { useMemo, useState } from 'react';
import { View } from 'react-native';

import { MoveLeftArrowIcon, MoveRightArrowIcon, Text } from '@sz/components';
import { szdayjs, tw } from '@sz/config';
import { Color, TextVariant, dateFormats } from '@sz/constants';

import { ArrowContainer } from './components/ArrowContainer';

interface MonthSelectorProps {
  disabled?: boolean; //This prop is use to handle the edge case for free tier users
  onNextPreviousIconPress?: () => void; //These callbacks can be use to dispatch actions
  onNextNextIconPress?: () => void;
}

export function MonthSelector({ disabled = false, onNextPreviousIconPress, onNextNextIconPress }: MonthSelectorProps) {
  const [visibleMonth, setVisibleMonth] = useState(dayjs());

  const onNextPreviousIconPressInternal = () => {
    setVisibleMonth(visibleMonth.subtract(1, 'months'));
    if (onNextPreviousIconPress) {
      onNextPreviousIconPress();
    }
  };

  const onNextMonthIconPressInternal = () => {
    setVisibleMonth(visibleMonth.add(1, 'months'));
    if (onNextNextIconPress) {
      onNextNextIconPress();
    }
  };

  const renderMonthDate = useMemo(() => {
    return szdayjs(visibleMonth).format(dateFormats.calenderHeader);
  }, [visibleMonth]);

  //To handle the edge case :: cannot go beyond the current month.
  const isLimitReached = useMemo(() => visibleMonth.get('month') === new Date().getMonth(), [visibleMonth]);

  return (
    <View style={tw`flex flex-row h-18 justify-between items-center px-4`} testID="MonthSelectorComponentTestID">
      <ArrowContainer onArrowIconPress={onNextPreviousIconPressInternal} disabled={disabled}>
        <MoveLeftArrowIcon />
      </ArrowContainer>
      <Text variant={TextVariant.SubTitle2SemiBold} color={disabled ? Color.Neutral.Sz600 : ('#1A5C23' as Color)}>
        {renderMonthDate}
      </Text>
      <ArrowContainer onArrowIconPress={onNextMonthIconPressInternal} disabled={isLimitReached || disabled}>
        <MoveRightArrowIcon />
      </ArrowContainer>
    </View>
  );
}
