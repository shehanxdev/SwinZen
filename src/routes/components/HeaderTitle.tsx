import { Text } from '@sz/components';
import { TextVariant } from '@sz/constants';

export function HeaderTitle({ children }) {
  return <Text variant={TextVariant.SubTitle2SemiBold}>{children}</Text>;
}
