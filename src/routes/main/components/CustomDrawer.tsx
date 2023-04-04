/* eslint-disable import/no-extraneous-dependencies */
import { BlurView } from '@react-native-community/blur';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import { SwingZenLogoSvg } from '@sz/assets';
import {
  AboutIcon,
  ContactIcon,
  CrossIcon,
  FollowersIcon,
  FriendIcon,
  LogoutIcon,
  NotificationIcon,
  PrivacyIcon,
  ProfileSettingsIcon,
  TermsIcon,
} from '@sz/components';
import { tw } from '@sz/config';
import { Color, Route } from '@sz/constants';
import { NavigationService } from '@sz/services';

import { DrawerItem } from './DrawerItem';

export function CustomDrawer() {
  const Logout = () => {
    // TODO:: Add API integrations here
    console.log('Logout Pressed');
  };

  return (
    <BlurView
      blurType="dark"
      blurAmount={1}
      style={tw`absolute top-0 bottom-0 left-0 right-0 rounded-r-3xl`}
      reducedTransparencyFallbackColor={Color.Neutral.Sz900}>
      <DrawerContentScrollView>
        <View style={tw`flex-row justify-between items-center mx-6 mb-6.5`}>
          <SwingZenLogoSvg />
          <TouchableOpacity onPress={() => {}}>
            <CrossIcon />
          </TouchableOpacity>
        </View>
        <DrawerItem
          active
          icon={<ProfileSettingsIcon />}
          title="Profile Settings"
          onPress={() => NavigationService.navigate(Route.ProfileSettings)}
        />
        <DrawerItem
          icon={<NotificationIcon />}
          title="Notification"
          onPress={() => NavigationService.navigate(Route.Notification)}
        />
        <DrawerItem
          icon={<FollowersIcon />}
          title="Followers"
          onPress={() => NavigationService.navigate(Route.Followers)}
        />
        <DrawerItem icon={<AboutIcon />} title="About us" onPress={() => NavigationService.navigate(Route.AboutUs)} />
        <DrawerItem
          icon={<PrivacyIcon />}
          title="Privacy policy"
          onPress={() => NavigationService.navigate(Route.PrivacyPolicy)}
        />
        <DrawerItem
          icon={<TermsIcon />}
          title="Terms of use"
          onPress={() => NavigationService.navigate(Route.TermsOfUse)}
        />
        <DrawerItem
          icon={<ContactIcon />}
          title="Contact us"
          onPress={() => NavigationService.navigate(Route.ContactUs)}
        />
        <DrawerItem icon={<FriendIcon />} title="Tell your friend" onPress={() => {}} />
        <DrawerItem icon={<LogoutIcon />} title="Logout" onPress={Logout} />
      </DrawerContentScrollView>
    </BlurView>
  );
}
