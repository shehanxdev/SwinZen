import { Text } from 'react-native';

import { Color } from '@sz/constants';

type RNTextProps = React.ComponentProps<typeof Text>;

export type WithRNLinkProps = Pick<RNTextProps, 'onPress' | 'testID' | 'onPress'>;

export interface LinkProps extends WithRNLinkProps {
  text: string;
  textColor?: Color;
  underline?: boolean;
}
