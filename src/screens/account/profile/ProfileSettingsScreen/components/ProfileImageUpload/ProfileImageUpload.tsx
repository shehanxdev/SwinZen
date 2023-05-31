import React, { useEffect, useMemo, useState } from 'react';
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
import { Color, FilesType, TextVariant } from '@sz/constants';
import { PreSignedResponse } from '@sz/models';
import { ToastService } from '@sz/services';
import { useSelector } from '@sz/stores';
import { getIntials } from '@sz/utils';

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
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const userData = useSelector(state => state.userStore.userData);
  const preSignedData = useSelector(state => state.userStore.preSignedData);

  const userProfilePic = userData?.profilePicture;

  //TODO:: handle custom fetching later
  const uploadMediaToS3 = async (preSignedData: PreSignedResponse) => {
    try {
      const formData = new FormData();
      const fields = preSignedData.fields;

      const file = {
        uri: newProfileImageData.assets[0].uri,
        type: newProfileImageData.assets[0].type,
        name: newProfileImageData.assets[0].fileName,
      };

      // To ignore last two items from the object
      const ignoreLastTwoItems = obj => Object.fromEntries(Object.entries(obj).slice(0, -2));

      Object.entries(ignoreLastTwoItems(fields)).forEach(([key, value]) => {
        formData.append(key, value);
      });

      formData.append('Content-Type', newProfileImageData.assets[0].type);
      formData.append('file', file);

      const response = await fetch(preSignedData.url, {
        method: 'POST',
        body: formData,
      });

      const data = await JSON.parse(JSON.stringify(response));
      if (data.status) {
        await dispatch.userStore.changeProfilePicture(preSignedData.fields.key);
      }
      dispatch.userStore.clearPreSignedData();
      setLoading(false);
    } catch (error) {
      dispatch.userStore.clearPreSignedData();
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (preSignedData) {
      uploadMediaToS3(preSignedData).catch(console.error);
    } else {
      setLoading(false);
    }
  }, [preSignedData]);

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
      await dispatch.userStore.getPreSignedData(FilesType.IMAGE);
      setLoading(true);
    }
    setNewProfileImageData(result);
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
      <TouchableOpacity
        onPress={() => {
          //TODO:: will be changed after popup common component implemented
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
          style={tw`w-[${CAMERA_ICON_DIMENTIONS.width}px] h-[${CAMERA_ICON_DIMENTIONS.height}px] rounded-full absolute right-[${CAMERA_ICON_POSITION.right}px] top-[${CAMERA_ICON_POSITION.top}px] justify-center items-center bg-Neutral-Sz100 z-20`}>
          <ProfileImageChangeCameraIcon />
        </View>
      </TouchableOpacity>
    </View>
  );
}
