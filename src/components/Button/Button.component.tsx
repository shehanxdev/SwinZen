import React, { useEffect } from 'react';
import { useMemo, useState } from 'react';
import { View } from 'react-native';
import { Button as RNPaperButton } from 'react-native-paper';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';

import { tw } from '@sz/config';
import { Color, TextVariant } from '@sz/constants';

import { LoadingIndicator } from '../LoadingIndicator';
import { Text } from '../Typography';
import { animatedButtonBoundries } from './Button.config';
import { ButtonProps } from './Button.types';

export function Button({
  backgroundColor = Color.Tertiary.Sz900,
  activeStateBackgroundColor = Color.Tertiary.Sz1000,
  onPress,
  onLongPress,
  textColor = Color.Neutral.Sz1000,
  testID,
  title,
  borderColor = Color.Transparency.full,
  disabledBackgroundColor = Color.Neutral.Sz900,
  disabledTextColor = Color.Neutral.Sz700,
  disabledBorderColor = Color.Neutral.Sz700,
  disabled = false,
  uppercase = true,
  loading = false,
}: ButtonProps) {
  const [isButtonClicked, setIsButtonClicked] = useState<boolean>(false);

  const width = useSharedValue(animatedButtonBoundries.initialWidth); //Has to go with percentages due to a technical blocker
  const borderRadius = useSharedValue(animatedButtonBoundries.initialBorderRadius); //px

  const buttonAnimatedStyles = useAnimatedStyle(() => {
    return { width: width.value, borderRadius: borderRadius.value };
  });

  //handle loading animation when the loading state changes
  useEffect(() => {
    if (loading) {
      width.value = withSpring(animatedButtonBoundries.loadingWidth);
      borderRadius.value = withSpring(animatedButtonBoundries.loadingBorderRadius);
    } else {
      width.value = withTiming(animatedButtonBoundries.initialWidth);
      borderRadius.value = withSpring(animatedButtonBoundries.initialBorderRadius);
    }
  }, [loading]);

  const buttonBackgroundColor = useMemo(() => {
    const buttonBackgroundColor =
      disabled && disabledBackgroundColor
        ? disabledBackgroundColor
        : isButtonClicked
        ? activeStateBackgroundColor
        : backgroundColor;

    return buttonBackgroundColor;
  }, [disabled, disabledBackgroundColor, isButtonClicked]);

  const buttonBorderColor = useMemo(() => {
    const buttonBorderColor = disabled ? disabledBorderColor : borderColor;

    return buttonBorderColor;
  }, [disabled, disabledBorderColor, isButtonClicked]);

  return (
    <Animated.View
      style={[
        tw`flex-row bg-[${buttonBackgroundColor}] rounded-2.5 justify-center shadow-none border border-[${buttonBorderColor}]`,
        buttonAnimatedStyles,
      ]}>
      {loading && (
        <View style={tw`absolute self-center z-1`}>
          <LoadingIndicator size="small" color={textColor} />
        </View>
      )}
      <RNPaperButton
        compact={true}
        uppercase={uppercase}
        disabled={disabled}
        onPress={onPress}
        style={tw`flex-1`}
        contentStyle={tw`h-12`}
        testID={testID}
        onTouchStart={() => {
          setIsButtonClicked(true);
        }}
        onTouchEnd={() => {
          setIsButtonClicked(false);
        }}
        onLongPress={onLongPress}>
        {!loading && (
          <Text variant={TextVariant.Body1SemiBold} color={disabled ? disabledTextColor : textColor}>
            {title}
          </Text>
        )}
      </RNPaperButton>
    </Animated.View>
  );
}
