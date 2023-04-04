import React, { ReactNode } from 'react';
import { GestureResponderEvent, TouchableOpacity, View } from 'react-native';

import { Text } from '@sz/components';
import { tw } from '@sz/config';
import { Color, TextVariant } from '@sz/constants';

export interface DrawerItemProps {
  active?: boolean;
  icon: ReactNode;
  title: string;
  onPress: (event: GestureResponderEvent) => void;
}

export function DrawerItem({ icon, active, title, onPress }: DrawerItemProps) {
  return (
    <TouchableOpacity style={tw`flex-row mx-6 mt-7`} onPress={onPress}>
      <View style={tw`mr-3.25`}>{icon}</View>
      <Text color={active ? Color.Primary.Sz400 : Color.Neutral.White} variant={TextVariant.Body2SemiBold}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}
