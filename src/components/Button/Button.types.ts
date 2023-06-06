import React from 'react';
import { Button } from 'react-native-paper';

import { Color } from '@sz/constants';

type RNPaperButtonProps = React.ComponentProps<typeof Button>;

export type WithRNPaperButtonProps = Pick<
  RNPaperButtonProps,
  'onPress' | 'testID' | 'disabled' | 'onLongPress' | 'uppercase'
>;

export interface ButtonProps extends WithRNPaperButtonProps {
  backgroundColor?: Color;
  activeStateBackgroundColor?: Color;
  title: string;
  textColor?: Color;
  disabledBackgroundColor?: Color;
  disabledTextColor?: Color;
  borderColor?: Color;
  disabledBorderColor?: Color;
  loading?: boolean;
}
