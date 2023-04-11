import React, { ReactElement, useMemo } from 'react';
import { GestureResponderEvent, TouchableOpacity, View } from 'react-native';

import { Text } from '@sz/components';
import { tw } from '@sz/config';
import { Color, TextVariant } from '@sz/constants';

export interface DrawerItemProps {
  active?: boolean;
  title: string;
  icon: ReactElement;
  onPress: (event: GestureResponderEvent) => void;
}

export function DrawerItem({ active, title, icon, onPress }: DrawerItemProps) {
  const renderIcon = useMemo(
    () =>
      React.cloneElement(icon as ReactElement, {
        ...(active && { color: Color.Primary.Sz400 }),
      }),
    [icon, active],
  );

  return (
    <TouchableOpacity style={tw`flex-row mx-6 mt-7`} onPress={onPress}>
      <View style={tw`mr-3.25`}>{renderIcon}</View>
      <Text color={active ? Color.Primary.Sz400 : Color.Neutral.White} variant={TextVariant.Body2SemiBold}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}
