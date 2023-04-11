/* eslint-disable import/no-extraneous-dependencies */
import { BlurView } from '@react-native-community/blur';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import React, { ReactElement } from 'react';
import { GestureResponderEvent, TouchableOpacity, View } from 'react-native';

import { SwingZenLogoSvg } from '@sz/assets';
import {
  CrossIcon,
  DrawerAboutIcon,
  DrawerContactIcon,
  DrawerFollowersIcon,
  DrawerFriendIcon,
  DrawerLogoutIcon,
  DrawerNotificationIcon,
  DrawerPrivacyIcon,
  DrawerProfileSettingsIcon,
  DrawerTermsIcon,
} from '@sz/components';
import { tw } from '@sz/config';
import { Color, Route } from '@sz/constants';
import { NavigationService } from '@sz/services';
import { useDispatch } from '@sz/stores';

import { DrawerItem } from './DrawerItem';

interface ItemProps {
  title: string;
  icon: ReactElement;
  action: (event: GestureResponderEvent) => void;
}

export function CustomDrawer() {
  const dispatch = useDispatch();

  const onShare = async () => {
    // TODO:: implement
  };

  const Logout = async () => {
    try {
      await dispatch.userStore.logoutUser();
      NavigationService.navigate(Route.Login);
    } catch (error: any) {
      console.log('error:', error);
    }
  };

  // providing data into list
  const listData: ItemProps[] = [
    {
      title: 'Profile Settings',
      icon: <DrawerProfileSettingsIcon />,
      action: () => NavigationService.navigate(Route.ProfileSettings),
    },
    {
      title: 'Notification',
      icon: <DrawerNotificationIcon />,
      action: () => NavigationService.navigate(Route.Notification),
    },
    {
      title: 'Followers',
      icon: <DrawerFollowersIcon />,
      action: () => NavigationService.navigate(Route.Followers),
    },
    {
      title: 'About us',
      icon: <DrawerAboutIcon />,
      action: () => NavigationService.navigate(Route.AboutUs),
    },
    {
      title: 'Privacy policy',
      icon: <DrawerPrivacyIcon />,
      action: () => NavigationService.navigate(Route.PrivacyPolicy),
    },
    {
      title: 'Terms of use',
      icon: <DrawerTermsIcon />,
      action: () => NavigationService.navigate(Route.TermsOfUse),
    },
    {
      title: 'Contact us',
      icon: <DrawerContactIcon />,
      action: () => NavigationService.navigate(Route.ContactUs),
    },
    {
      title: 'Tell your friend',
      icon: <DrawerFriendIcon />,
      action: onShare,
    },
    {
      title: 'Logout',
      icon: <DrawerLogoutIcon />,
      action: Logout,
    },
  ];

  return (
    <View style={tw`overflow-hidden absolute top-0 bottom-0 left-0 right-0 rounded-r-[32px]`}>
      <BlurView
        blurType="dark"
        blurAmount={1}
        style={tw`flex-1`}
        reducedTransparencyFallbackColor={Color.Neutral.Sz900}>
        <DrawerContentScrollView>
          <View style={tw`flex-row justify-between items-center mx-6 mt-8 mb-6.5`}>
            <SwingZenLogoSvg />
            <TouchableOpacity onPress={() => NavigationService.closeDrawer()}>
              <CrossIcon />
            </TouchableOpacity>
          </View>
          {listData.map((data, index) => (
            <DrawerItem key={index} title={data.title} icon={data.icon} onPress={data.action} />
          ))}
        </DrawerContentScrollView>
      </BlurView>
    </View>
  );
}
