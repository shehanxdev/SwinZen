import React, { useMemo, useState } from 'react';
import { ActivityIndicator, Alert, TouchableOpacity, View } from 'react-native';
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
  saveToPhotos: false,
};
const GALLERY_OPTIONS: ImageLibraryOptions = {
  mediaType: 'photo',
  includeBase64: false,
  presentationStyle: 'fullScreen',
  selectionLimit: 1,
};

type ImagePickType = 'capture' | 'library';

export function ProfileImageUpload() {
  const [newProfileImageData, setNewProfileImageData] = useState<ImagePickerResponse>(null);

  const loading = useSelector(state => state.loading.effects.userStore.changeProfilePicture);

  const dispatch = useDispatch();

  const onButtonPress = async (type?: ImagePickType) => {
    let result: ImagePickerResponse;

    if (type === 'capture') {
      result = await launchCamera(CAMERA_OPTIONS);
    } else {
      result = await launchImageLibrary(GALLERY_OPTIONS, setNewProfileImageData);
    }

    if (result.didCancel) return;

    if (result.errorMessage) {
      ToastService.error({ message: 'Failed!', description: newProfileImageData?.errorMessage });
      return;
    }

    await dispatch.userStore.changeProfilePicture(result);
    setNewProfileImageData(result);
  };

  //TODO::fetch and display user data
  const renderProfileImage = useMemo(
    () =>
      newProfileImageData?.assets === undefined || loading ? (
        <View style={PROFILE_IMAGE_COMMON_STYLES}>
          {/* TODO::Create a helper function to get the first characters from full name when intergration with the APIs*/}
          {/* TODO::add a proper loading indicator */}
          {loading ? <ActivityIndicator /> : <Text variant={TextVariant.SubTitle1}>{'MW'}</Text>}
        </View>
      ) : (
        <FastImage
          style={PROFILE_IMAGE_COMMON_STYLES}
          source={{
            uri: newProfileImageData?.assets[0]?.uri,
          }}
        />
      ),
    [newProfileImageData, loading],
  );

  return (
    <View testID="ProfileImageComponentTestID" style={tw`m-auto`}>
      <TouchableOpacity
        onPress={() => {
          //TODO::provide a proper choose UI to the end user
          Alert.alert('Choose option', '', [
            {
              text: 'Camera',
              onPress: () => {
                onButtonPress('capture').catch(console.error);
              },
            },
            {
              text: 'Gallery',
              onPress: () => {
                onButtonPress().catch(console.error);
              },
            },
          ]);
        }}>
        {renderProfileImage}
        <View
          style={tw`w-[${CAMERA_ICON_DIMENTIONS.width}px] h-[${CAMERA_ICON_DIMENTIONS.height}px] rounded-full absolute right-[${CAMERA_ICON_POSITION.right}px] top-[${CAMERA_ICON_POSITION.top}px] justify-center items-center bg-Neutral-Sz100`}>
          <ProfileImageChangeCameraIcon />
        </View>
      </TouchableOpacity>
    </View>
  );
}
