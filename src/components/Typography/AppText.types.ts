import { Text } from 'react-native';

import { Color, TextAlignment, TextVariant } from '@sz/constants';

type RNTextProps = React.ComponentProps<typeof Text>;

export type WithRNTextProps = Pick<RNTextProps, 'onPress' | 'testID' | 'numberOfLines'>;

export interface AppTextProps extends WithRNTextProps {
  color?: Color;
  textAlign?: TextAlignment;
  variant: TextVariant;
  underline?: boolean;
}
