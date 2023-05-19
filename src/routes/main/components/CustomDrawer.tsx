import { BlurView } from '@react-native-community/blur';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import React, { ReactElement } from 'react';
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

type DrawerContent = {
  title: string;
  icon: ReactElement;
  route: Route;
};

const commonDrawerContents: DrawerContent[] = [
  { title: 'Profile Settings', icon: <DrawerProfileSettingsIcon />, route: Route.ProfileSettings },
  { title: 'Notification', icon: <DrawerNotificationIcon />, route: Route.Notification },
  { title: 'Followers', icon: <DrawerFollowersIcon />, route: Route.Followers },
  { title: 'About us', icon: <DrawerAboutIcon />, route: Route.AboutUs },
  { title: 'FAQ', icon: <DrawerFAQIcon />, route: Route.FAQ },
  { title: 'Privacy policy', icon: <DrawerPrivacyIcon />, route: Route.PrivacyPolicy },
  { title: 'Terms of use', icon: <DrawerTermsIcon />, route: Route.TermsOfUse },
  { title: 'Contact us', icon: <DrawerContactIcon />, route: Route.ContactUs },
];

export function CustomDrawer() {
  const dispatch = useDispatch();

  const Logout = (): void => {
    dispatch.userStore
      .logoutUser()
      .catch((error: any) => ToastService.error({ message: 'Failed!', description: error.data.message }));
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
          {commonDrawerContents.map((content, index) => (
            <DrawerItem
              key={index}
              title={content.title}
              icon={content.icon}
              onPress={() => {
                NavigationService.closeDrawer();
                NavigationService.navigate(content.route);
              }}
            />
          ))}
          {/* NOTE::Edge case for logout */}
          <DrawerItem title="Logout" icon={<DrawerLogoutIcon />} onPress={Logout} />
        </DrawerContentScrollView>
      </BlurView>
    </View>
  );
}
