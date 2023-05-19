import React, { useEffect, useMemo, useState } from 'react';
import { Alert, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import {
  CameraOptions,
  ImageLibraryOptions,
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import { useDispatch } from 'react-redux';

import { ProfileImageChangeCameraIcon, Text } from '@sz/components';
import { tw } from '@sz/config';
import { TextVariant } from '@sz/constants';
import { ToastService } from '@sz/services';
import { useSelector } from '@sz/stores';

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
const CAMERA_OPTIONS: CameraOptions = {
  mediaType: 'photo',
  includeBase64: false,
  presentationStyle: 'fullScreen',
  saveToPhotos: true,
};
const GALLERY_OPTIONS: ImageLibraryOptions = {
  mediaType: 'photo',
  includeBase64: false,
  presentationStyle: 'fullScreen',
  selectionLimit: 1,
};

type ImagePickType = 'capture' | 'library';

export function ProfileImageUpload() {
  const [profileImageData, setProfileImageData] = useState<ImagePickerResponse>(null);

  const loading = useSelector(state => state.loading.effects.userStore.changeProfilePicture);

  const dispatch = useDispatch();

  useEffect(() => {
    if (profileImageData?.errorMessage) {
      ToastService.error({ message: 'Failed!', description: profileImageData?.errorMessage });
    }
  }, [profileImageData]);

  const onButtonPress = async (type?: ImagePickType) => {
    let result: ImagePickerResponse;

    if (type === 'capture') {
      result = await launchCamera(CAMERA_OPTIONS);
    } else {
      result = await launchImageLibrary(GALLERY_OPTIONS, setProfileImageData);
    }

    await dispatch.userStore.changeProfilePicture(result);
    setProfileImageData(result);
  };

  const renderProfileImage = useMemo(
    () =>
      profileImageData === null || profileImageData?.assets?.length === 0 || loading ? (
        <View style={PROFILE_IMAGE_COMMON_STYLES}>
          {/* TODO::Create a helper function to get the first characters from full name when intergration with the APIs*/}
          {/* TODO::add a proper loading indicator */}
          <Text variant={TextVariant.SubTitle1}>{loading ? 'loading' : 'MW'}</Text>
        </View>
      ) : (
        <FastImage
          style={PROFILE_IMAGE_COMMON_STYLES}
          source={{
            uri: profileImageData.assets[0].uri,
          }}
        />
      ),
    [profileImageData, loading],
  );

  return (
    <View testID="ProfileImageComponentTestID" style={tw`m-auto`}>
      {renderProfileImage}
      <TouchableOpacity
        style={tw`w-[${CAMERA_ICON_DIMENTIONS.width}px] h-[${CAMERA_ICON_DIMENTIONS.height}px] rounded-full absolute right-[${CAMERA_ICON_POSITION.right}px] top-[${CAMERA_ICON_POSITION.top}px] justify-center items-center bg-Neutral-Sz100`}
        onPress={() => {
          //TODO::provide a proper choose UI to the end user
          Alert.alert('Choose option', '', [
            {
              text: 'Camera',
              onPress: () => {
                onButtonPress('capture');
              },
            },
            {
              text: 'Gallery',
              onPress: () => {
                onButtonPress();
              },
            },
          ]);
        }}>
        <ProfileImageChangeCameraIcon />
      </TouchableOpacity>
    </View>
  );
}
