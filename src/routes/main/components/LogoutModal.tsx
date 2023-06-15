import React from 'react';
import { View } from 'react-native';

import { ModalLayout, Text } from '@sz/components';
import { tw } from '@sz/config';
import { Color, TextVariant } from '@sz/constants';

interface LogoutModalProps {
  testID?: string;
  showModal: boolean;
  handleLogout: () => void;
  handleModalClose: () => void;
}

export function LogoutModal({ showModal, handleModalClose, handleLogout }: LogoutModalProps) {
  return (
    <ModalLayout
      showModal={showModal}
      handleModalClose={handleModalClose}
      leftButtonTitle="YES"
      rightButtonTitle="NO"
      onLeftButtonPress={() => {
        handleModalClose();
        setTimeout(() => handleLogout(), 200);
      }}
      onRightButtonPress={handleModalClose}>
      <View style={tw`mb-3 px-12.5`}>
        <Text variant={TextVariant.Body1SemiBold} color={Color.Neutral.White}>
          Are you sure you want to logout?
        </Text>
      </View>
    </ModalLayout>
  );
}
