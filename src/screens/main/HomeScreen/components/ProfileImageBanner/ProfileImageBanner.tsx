import { BlurView } from '@react-native-community/blur';
import React, { useMemo, useState } from 'react';
import { Dimensions, Image, TouchableOpacity, View } from 'react-native';

import { SettingsMiniIcon, Text } from '@sz/components';
import { tw } from '@sz/config';
import { Color, TextVariant } from '@sz/constants';
import { NavigationService } from '@sz/services';

const PROFILE_IMAGE_DIMENTIONS = {
  height: 25,
  width: 25,
};
const PROFILE_IMAGE_COMMON_STYLES = tw`w-${PROFILE_IMAGE_DIMENTIONS.width} h-${PROFILE_IMAGE_DIMENTIONS.height} rounded-full absolute right-0 bottom-0 bg-[#1A5C23] items-center justify-center`; //NOTE::this color isn't avaialble within the design system

/*
 Background Container 
 ===========================================
 | ==========================  =========== |
 | |      Container         |  | Profile  ||
 | |                        |  |  Image   ||
 | ==========================  =========== |
 ===========================================
*/
export function ProfileImageBanner() {
  const currentWindowWidth = Dimensions.get('window').width;

  const [profileImage] = useState(null); //TODO::remove this when integrations with the APIs && get profile related data for the store.

  const [backgroundContainerWidth, setBackgroundContainerWidth] = useState(currentWindowWidth);
  const containerWidth = useMemo(
    () => backgroundContainerWidth - (PROFILE_IMAGE_DIMENTIONS.width / 2) * 4,
    [backgroundContainerWidth],
  );

  const renderProfileImageBanner = useMemo(
    () =>
      profileImage === null ? (
        <View style={PROFILE_IMAGE_COMMON_STYLES}>
          {/* TODO::Create a helper function to get the first characters from full name when intergration with the APIs*/}
          <Text variant={TextVariant.SubTitle1}>MW</Text>
        </View>
      ) : (
        <Image
          style={PROFILE_IMAGE_COMMON_STYLES}
          source={{
            uri: 'https://ymw.edu.in/wp-content/uploads/2022/02/dummy-profile-01.png', //TODO::remove this dummy URL when intergration with the APIs
          }}
        />
      ),
    [profileImage],
  );

  return (
    // NOTE:: All the components are absolutely prositioned to the Background Container
    <View
      onLayout={event => {
        let { width } = event.nativeEvent.layout;
        setBackgroundContainerWidth(width);
      }}
      style={tw`w-full h-18 rounded-2.5`}>
      {renderProfileImageBanner}
      <TouchableOpacity
        style={tw`w-6 h-6 rounded-full absolute right-0 bottom-0 justify-center items-center bg-Neutral-Sz100`}
        onPress={() => NavigationService.openDrawer()}>
        <SettingsMiniIcon />
      </TouchableOpacity>
      <View
        style={[
          tw`h-18 pt-2 pl-3.5 rounded-2.5 overflow-hidden items-start`,
          {
            zIndex: -1,
            width: containerWidth,
          },
        ]}>
        <BlurView
          blurType="dark"
          blurAmount={1} //TODO:: Replace the magic number with a constant
          reducedTransparencyFallbackColor={Color.Neutral.Sz900}
          style={tw`absolute inset-0 rounded-2.5`}
        />
        <Text variant={TextVariant.Body2Regular} color={Color.Tertiary.Sz900}>
          Hello,
        </Text>
        {/* TODO::remove this dummy data */}
        <Text variant={TextVariant.SubTitle2SemiBold}>Marshall Williams</Text>
      </View>
    </View>
  );
}
