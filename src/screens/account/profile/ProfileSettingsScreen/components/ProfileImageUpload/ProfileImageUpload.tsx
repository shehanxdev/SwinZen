import React, { useMemo, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';

import { ProfileImageChangeCameraIcon, Text } from '@sz/components';
import { tw } from '@sz/config';
import { TextVariant } from '@sz/constants';
import { NavigationService } from '@sz/services';

//Note::below values are in PX
const PROFILE_IMAGE_DIMENTIONS = {
  height: 134,
  width: 134,
};
const CAMERA_ICON_DIMENTIONS = {
  height: 28,
  width: 28,
};
const PROFILE_IMAGE_COMMON_STYLES = tw`w-[${PROFILE_IMAGE_DIMENTIONS.width}px] h-[${PROFILE_IMAGE_DIMENTIONS.height}px] rounded-full bg-Primary-Sz650 items-center justify-center border-2 border-Neutral-Sz100`;
const CAMERA_ICON_POSITION = {
  top: PROFILE_IMAGE_DIMENTIONS.width / 8 - CAMERA_ICON_DIMENTIONS.height / 2,
  right: PROFILE_IMAGE_DIMENTIONS.width / 8 - CAMERA_ICON_DIMENTIONS.width / 2,
};

export function ProfileImageUpload() {
  const [profileImage] = useState(null); //TODO::remove this when integrations with the APIs && get profile related data for the store.

  const renderProfileImage = useMemo(
    () =>
      profileImage === null ? (
        <View style={PROFILE_IMAGE_COMMON_STYLES}>
          {/* TODO::Create a helper function to get the first characters from full name when intergration with the APIs*/}
          <Text variant={TextVariant.SubTitle1}>MW</Text>
        </View>
      ) : (
        <FastImage
          style={PROFILE_IMAGE_COMMON_STYLES}
          source={{
            uri: 'https://ymw.edu.in/wp-content/uploads/2022/02/dummy-profile-01.png', //TODO::remove this dummy URL when intergration with the APIs
          }}
        />
      ),
    [profileImage],
  );

  return (
    <View testID="ProfileImageComponentTestID" style={tw`m-auto`}>
      {renderProfileImage}
      <TouchableOpacity
        style={tw`w-[${CAMERA_ICON_DIMENTIONS.width}px] h-[${CAMERA_ICON_DIMENTIONS.height}px] rounded-full absolute right-[${CAMERA_ICON_POSITION.right}px] top-[${CAMERA_ICON_POSITION.top}px]  justify-center items-center bg-Neutral-Sz100`}
        onPress={() => NavigationService.openDrawer()}>
        <ProfileImageChangeCameraIcon />
      </TouchableOpacity>
    </View>
  );
}
