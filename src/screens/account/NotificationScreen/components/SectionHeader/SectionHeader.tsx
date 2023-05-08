import React from 'react';
import { View } from 'react-native';

import { Text } from '@sz/components';
import { tw } from '@sz/config';
import { Color, TextVariant } from '@sz/constants';

interface NotificationCardProps {
  testID?: string;
  title: string;
}

export function SectionHeader({ testID, title }: NotificationCardProps) {
  return (
    <View testID={testID} style={tw`mx-5 mt-8 mb-1 items-start`}>
      <Text color={Color.Primary.Sz100} variant={TextVariant.SubTitle2SemiBold}>
        {title}
      </Text>
    </View>
  );
}
