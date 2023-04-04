import React from 'react';
import { LinearGradientProps } from 'react-native-linear-gradient';
import { Card } from 'react-native-paper';

import { Color } from '@sz/constants';

type RNPaperCardProps = React.ComponentProps<typeof Card>;

export type WithRNPaperCardProps = Pick<RNPaperCardProps, 'testID'>;

export interface CardProps extends WithRNPaperCardProps, Partial<LinearGradientProps> {
  backGroundColor?: Color;
  title: string;
  subTitle: string;
  loading?: boolean;
  price: number;
  pricingDescription: string;
  featureList: string[];
  hasBorder?: boolean;
  borderColor?: Color;
  buttonColor?: Color;
  buttontextColor?: Color;
}
