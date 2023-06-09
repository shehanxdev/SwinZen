import { View } from 'react-native';

import { Text } from '@sz/components';
import { tw } from '@sz/config';
import { TextVariant } from '@sz/constants';

export interface TabScreenHeaderProps {
  title: string;
}

export function TabScreenHeader({ title }: TabScreenHeaderProps) {
  return (
    <View style={tw`pt-8`}>
      <Text variant={TextVariant.SubTitle2SemiBold}>{title}</Text>
    </View>
  );
}
