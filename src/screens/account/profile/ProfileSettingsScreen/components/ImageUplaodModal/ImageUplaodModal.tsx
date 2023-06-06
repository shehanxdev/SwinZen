import React from 'react';
import { View } from 'react-native';

import { ModalLayout, Text } from '@sz/components';
import { tw } from '@sz/config';
import { Color, TextVariant } from '@sz/constants';

interface ImageUplaodModalProps {
  testID?: string;
  showModal: boolean;
  handleModalClose: () => void;
  handleCamera: () => void;
  handleGallery: () => void;
}

export function ImageUplaodModal({ showModal, handleCamera, handleGallery, handleModalClose }: ImageUplaodModalProps) {
  return (
    <View testID="ImageUplaodModalTestID">
      <ModalLayout
        showCloseIcon
        showModal={showModal}
        handleModalClose={handleModalClose}
        leftButtonTitle="CAMERA"
        rightButtonTitle="GALLERY"
        onLeftButtonPress={() => {
          handleModalClose();
          setTimeout(() => handleCamera(), 200);
        }}
        onRightButtonPress={() => {
          handleModalClose();
          setTimeout(() => handleGallery(), 200);
        }}>
        <View style={tw`mb-2`}>
          <Text variant={TextVariant.Body1SemiBold} color={Color.Neutral.White}>
            Please select an option
          </Text>
        </View>
        <View style={tw`mb-11 mx-14`}>
          <Text variant={TextVariant.Body1Regular}>Select one of the camera option from below to get started</Text>
        </View>
      </ModalLayout>
    </View>
  );
}
