import * as React from 'react';
import { useMemo, useState } from 'react';
import { View } from 'react-native';
import { Button as RNPaperButton } from 'react-native-paper';

import { tw } from '@sz/config';
import { Color, TextVariant } from '@sz/constants';

import { Text } from '../Typography';
import { ButtonProps } from './Button.types';

export function Button({
  backgroundColor = Color.Primary.Sz400,
  ActiveStateBackgroundColor = Color.Primary.Sz600,
  onPress,
  onLongPress,
  textColor = Color.Neutral.Sz100,
  testID,
  title,
  borderColor = Color.Transparency.full,
  disabledBackgroundColor = Color.Neutral.Sz900,
  disabledTextColor = Color.Neutral.Sz700,
  disabledBorderColor = Color.Neutral.Sz700,
  disabled = false,
  uppercase = false,
  fullWidth = true,
}: ButtonProps) {
  const [isButtonClicked, setIsButtonClicked] = useState<boolean>(false);

  const buttonBackgroundColor = useMemo(() => {
    const buttonBackgroundColor =
      disabled && disabledBackgroundColor
        ? disabledBackgroundColor
        : isButtonClicked
        ? ActiveStateBackgroundColor
        : backgroundColor;

    return buttonBackgroundColor;
  }, [disabled, disabledBackgroundColor, isButtonClicked]);

  const buttonBorderColor = useMemo(() => {
    const buttonBorderColor = disabled ? disabledBorderColor : borderColor;

    return buttonBorderColor;
  }, [disabled, disabledBorderColor, isButtonClicked]);

  return (
    <View style={tw`flex-row`}>
      <RNPaperButton
        compact={true}
        uppercase={uppercase}
        disabled={disabled}
        onPress={onPress}
        style={[
          tw`bg-[${buttonBackgroundColor}] rounded-2.5 h-12 justify-center shadow-none border-1 border-[${buttonBorderColor}] ${
            fullWidth ? 'w-full' : undefined
          }`,
        ]}
        testID={testID}
        onPressIn={() => {
          setIsButtonClicked(true);
        }}
        onPressOut={() => {
          setIsButtonClicked(false);
        }}
        onLongPress={onLongPress}>
        <Text variant={TextVariant.Body2SemiBold} color={disabled ? disabledTextColor : textColor}>
          {title}
        </Text>
      </RNPaperButton>
    </View>
  );
}
