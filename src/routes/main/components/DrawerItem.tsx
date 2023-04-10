import React from 'react';
import { GestureResponderEvent, TouchableOpacity, View } from 'react-native';

import {
  DrawerAboutIcon,
  DrawerContactIcon,
  DrawerFollowersIcon,
  DrawerFriendIcon,
  DrawerLogoutIcon,
  DrawerNotificationIcon,
  DrawerPrivacyIcon,
  DrawerProfileSettingsIcon,
  DrawerTermsIcon,
  Text,
} from '@sz/components';
import { tw } from '@sz/config';
import { Color, TextVariant } from '@sz/constants';

export interface DrawerItemProps {
  active?: boolean;
  title: string;
  onPress: (event: GestureResponderEvent) => void;
}

export function DrawerItem({ active, title, onPress }: DrawerItemProps) {
  const getIcon = () => {
    switch (title) {
      case 'Profile Settings':
        return <DrawerProfileSettingsIcon color={active ? Color.Primary.Sz400 : Color.Neutral.White} />;
      case 'Notification':
        return <DrawerNotificationIcon color={active ? Color.Primary.Sz400 : Color.Neutral.White} />;
      case 'Followers':
        return <DrawerFollowersIcon color={active ? Color.Primary.Sz400 : Color.Neutral.White} />;
      case 'About us':
        return <DrawerAboutIcon color={active ? Color.Primary.Sz400 : Color.Neutral.White} />;
      case 'Privacy policy':
        return <DrawerPrivacyIcon color={active ? Color.Primary.Sz400 : Color.Neutral.White} />;
      case 'Terms of use':
        return <DrawerTermsIcon color={active ? Color.Primary.Sz400 : Color.Neutral.White} />;
      case 'Contact us':
        return <DrawerContactIcon color={active ? Color.Primary.Sz400 : Color.Neutral.White} />;
      case 'Tell your friend':
        return <DrawerFriendIcon color={active ? Color.Primary.Sz400 : Color.Neutral.White} />;
      case 'Logout':
        return <DrawerLogoutIcon color={active ? Color.Primary.Sz400 : Color.Neutral.White} />;
    }
  };

  return (
    <TouchableOpacity style={tw`flex-row mx-6 mt-7`} onPress={onPress}>
      <View style={tw`mr-3.25`}>{getIcon()}</View>
      <Text color={active ? Color.Primary.Sz400 : Color.Neutral.White} variant={TextVariant.Body2SemiBold}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}
