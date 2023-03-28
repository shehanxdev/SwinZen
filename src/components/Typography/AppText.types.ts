import { GestureResponderEvent, Text } from 'react-native';

import { Color, TextAlignment, TextVariant } from '@sz/constants';

type RNTextProps = React.ComponentProps<typeof Text>;

export type WithRNTextProps = Pick<RNTextProps, 'testID' | 'numberOfLines'>;

export interface AppTextProps extends WithRNTextProps {
  color?: Color;
  textAlign?: TextAlignment;
  variant: TextVariant;
  underline?: boolean;
  onPress?: (event: GestureResponderEvent) => void; //need this prop to work with links
}
