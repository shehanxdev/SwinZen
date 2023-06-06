import React, { useMemo, useState } from 'react';
import { ActivityIndicator, TouchableOpacity, View } from 'react-native';
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
import { Color, TextVariant } from '@sz/constants';
import { ToastService } from '@sz/services';
import { useSelector } from '@sz/stores';
import { getIntials } from '@sz/utils';

import { ImageUplaodModal } from '../ImageUplaodModal';

//Note::below values are in PX
const PROFILE_IMAGE_DIMENTIONS = {
  height: 134,
  width: 134,
};
const CAMERA_ICON_DIMENTIONS = {
  height: 28,
  width: 28,
};
const PROFILE_IMAGE_COMMON_STYLES = tw`w-[${PROFILE_IMAGE_DIMENTIONS.width}px] h-[${PROFILE_IMAGE_DIMENTIONS.height}px] rounded-full bg-Primary-Sz650 items-center justify-center border-2 border-Neutral-Sz100 z-0`;
const LOADER_STYLES = tw`p-[${PROFILE_IMAGE_DIMENTIONS.width / 2}px] bg-[${
  Color.Transparency.Sz56
}]  rounded-full absolute z-10`;
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
  const [showModal, setShowModal] = useState<boolean>(false);

  const userData = useSelector(state => state.userStore.userData);
  const userProfilePic = userData?.profilePicture;
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
    if (result?.assets) {
      try {
        await dispatch.userStore.changeProfilePicture(result.assets[0]);
      } catch {
        ToastService.error({
          message: 'Failed!',
          description: 'An error occurred while attempting to update the profile picture',
        });
      }
    }
  };

  const renderProfileImage = useMemo(
    () =>
      userProfilePic ? (
        <>
          {/* TODO::add a proper loading indicator */}
          {loading && (
            <View style={LOADER_STYLES}>
              <ActivityIndicator color={Color.Neutral.White} />
            </View>
          )}
          <FastImage
            style={PROFILE_IMAGE_COMMON_STYLES}
            source={{
              cache: FastImage.cacheControl.immutable,
              priority: FastImage.priority.high,
              uri: userProfilePic || newProfileImageData?.assets[0]?.uri,
            }}
          />
        </>
      ) : (
        <>
          {loading && (
            <View style={LOADER_STYLES}>
              <ActivityIndicator color={Color.Neutral.White} />
            </View>
          )}
          <View style={PROFILE_IMAGE_COMMON_STYLES}>
            <Text variant={TextVariant.SubTitle1}>{getIntials(userData?.name)}</Text>
          </View>
        </>
      ),
    [newProfileImageData, userProfilePic, loading],
  );

  return (
    <View testID="ProfileImageComponentTestID" style={tw`m-auto`}>
      <TouchableOpacity onPress={() => setShowModal(true)}>
        {renderProfileImage}
        <View
          style={tw`w-[${CAMERA_ICON_DIMENTIONS.width}px] h-[${CAMERA_ICON_DIMENTIONS.height}px] rounded-full absolute right-[${CAMERA_ICON_POSITION.right}px] top-[${CAMERA_ICON_POSITION.top}px] justify-center items-center bg-Neutral-Sz100 z-20`}>
          <ProfileImageChangeCameraIcon />
        </View>
      </TouchableOpacity>
      <ImageUplaodModal
        showModal={showModal}
        handleCamera={() => onButtonPress('capture').catch(console.error)}
        handleGallery={onButtonPress}
        handleModalClose={() => setShowModal(false)}
      />
    </View>
  );
}
