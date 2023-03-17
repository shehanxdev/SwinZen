import { Color, TextAlignment, TextVariant } from '@sz/constants';

export interface AppTextProps {
  color?: Color;
  testID?: string;
  textAlign?: TextAlignment;
  variant: TextVariant;
  numberOfLines?: number;
  underline?: boolean;
}
