/* eslint-disable import/no-extraneous-dependencies */
import { BlurView } from '@react-native-community/blur';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import { SwingZenLogoSvg } from '@sz/assets';
import {
  CrossIcon,
  DrawerAboutIcon,
  DrawerContactIcon,
  DrawerFAQIcon,
  DrawerFollowersIcon,
  DrawerLogoutIcon,
  DrawerNotificationIcon,
  DrawerPrivacyIcon,
  DrawerProfileSettingsIcon,
  DrawerTermsIcon,
} from '@sz/components';
import { tw } from '@sz/config';
import { Color, Route } from '@sz/constants';
import { NavigationService, ToastService } from '@sz/services';
import { useDispatch } from '@sz/stores';

import { DrawerItem } from './DrawerItem';

export function CustomDrawer() {
  const dispatch = useDispatch();

  const Logout = async () => {
    try {
      await dispatch.userStore.logoutUser();
      NavigationService.navigate(Route.Login);
    } catch (error: any) {
      ToastService.error({ message: 'Failed!', description: error.data.message });
    }
  };

  return (
    <View style={tw`overflow-hidden absolute inset-0 rounded-r-8`}>
      <BlurView
        blurType="dark"
        blurAmount={1}
        style={tw`flex-1`}
        reducedTransparencyFallbackColor={Color.Neutral.Sz900}>
        <DrawerContentScrollView contentContainerStyle={tw`pb-6`}>
          <View style={tw`flex-row justify-between items-center mx-6 mt-8 mb-6.5`}>
            <SwingZenLogoSvg />
            <TouchableOpacity onPress={() => NavigationService.closeDrawer()}>
              <CrossIcon />
            </TouchableOpacity>
          </View>
          <DrawerItem
            title="Profile Settings"
            icon={<DrawerProfileSettingsIcon />}
            onPress={() => NavigationService.navigate(Route.ProfileSettings)}
          />
          <DrawerItem
            title="Notification"
            icon={<DrawerNotificationIcon />}
            onPress={() => NavigationService.navigate(Route.Notification)}
          />
          <DrawerItem
            title="Followers"
            icon={<DrawerFollowersIcon />}
            onPress={() => NavigationService.navigate(Route.Followers)}
          />
          <DrawerItem
            title="About us"
            icon={<DrawerAboutIcon />}
            onPress={() => NavigationService.navigate(Route.AboutUs)}
          />
          <DrawerItem title="FAQ" icon={<DrawerFAQIcon />} onPress={() => NavigationService.navigate(Route.FAQ)} />
          <DrawerItem
            title="Privacy policy"
            icon={<DrawerPrivacyIcon />}
            onPress={() => NavigationService.navigate(Route.PrivacyPolicy)}
          />
          <DrawerItem
            title="Terms of use"
            icon={<DrawerTermsIcon />}
            onPress={() => NavigationService.navigate(Route.TermsOfUse)}
          />
          <DrawerItem
            title="Contact us"
            icon={<DrawerContactIcon />}
            onPress={() => NavigationService.navigate(Route.ContactUs)}
          />
          <DrawerItem title="Logout" icon={<DrawerLogoutIcon />} onPress={Logout} />
        </DrawerContentScrollView>
      </BlurView>
    </View>
  );
}
