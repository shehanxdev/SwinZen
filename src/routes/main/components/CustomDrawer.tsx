/* eslint-disable import/no-extraneous-dependencies */
import { BlurView } from '@react-native-community/blur';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import React from 'react';
import { Share, TouchableOpacity, View } from 'react-native';

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
import { Color, Route, SwingZenUrl } from '@sz/constants';
import { NavigationService } from '@sz/services';
import { useDispatch } from '@sz/stores';

import { DrawerItem } from './DrawerItem';

export function CustomDrawer() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const onShare = async () => {
    // TODO:: design not finalised yet
    try {
      const result = await Share.share({
        message: `Tell your friend about SwingZen App ${SwingZenUrl}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      console.log('error:', error);
    }
  };

  const Logout = async () => {
    try {
      await dispatch.userStore.logoutUser();
      NavigationService.navigate(Route.Login);
    } catch (error: any) {
      console.log('error:', error);
    }
  };

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
            <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.closeDrawer())}>
              <CrossIcon />
            </TouchableOpacity>
          </View>
          <DrawerItem
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
          <DrawerItem icon={<FriendIcon />} title="Tell your friend" onPress={onShare} />
          <DrawerItem icon={<LogoutIcon />} title="Logout" onPress={Logout} />
        </DrawerContentScrollView>
      </BlurView>
    </View>
  );
}
