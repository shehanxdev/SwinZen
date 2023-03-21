import React, { PropsWithChildren } from 'react';
import { Text as RNText } from 'react-native';

import { tw } from '@sz/config';
import { Color, TextAlignment } from '@sz/constants';

import { AppTextStyles, getAppTextStyles } from './AppText.config';
import { AppTextProps } from './AppText.types';

export function Text({
  color = Color.Neutral.Sz100,
  variant,
  textAlign = TextAlignment.Auto,
  numberOfLines,
  underline,
  testID,
  children,
}: PropsWithChildren<AppTextProps>) {
  const variantStyle = AppTextStyles[variant];

  let textStyles = getAppTextStyles(variant);

  if (underline) {
    textStyles += ' underline';
  }

  textStyles += ` text-${textAlign}`;

  const lineHeight: number = Number.parseFloat(variantStyle.lineHeight.toString().replace('px', ''));

  return (
    <RNText
      style={[
        {
          color,
          lineHeight: lineHeight,
        },
        tw`${textStyles}`,
      ]}
      testID={testID}
      numberOfLines={numberOfLines}>
      {children}
    </RNText>
  );
}
