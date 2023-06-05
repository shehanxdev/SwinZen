import React from 'react';
import { Pressable, View } from 'react-native';
import Modal from 'react-native-modal';

import { tw } from '@sz/config';
import { Color } from '@sz/constants';

import { Button } from '../Button';
import { ModalCloseIcon } from '../Icon';

interface ModalLayoutProps {
  showModal: boolean;
  handleModalClose: () => void;
  children: React.ReactNode;
  isSingleButton?: boolean;
  leftButtonTitle: string;
  rightButtonTitle: string;
  onLeftButtonPress: () => void;
  onRightButtonPress: () => void;
}

export function ModalLayout({
  showModal,
  handleModalClose,
  children,
  isSingleButton = false,
  leftButtonTitle,
  rightButtonTitle,
  onLeftButtonPress,
  onRightButtonPress,
}: ModalLayoutProps) {
  return (
    // Default backdrop color is used
    <Modal
      isVisible={showModal}
      onBackButtonPress={handleModalClose}
      animationIn="fadeIn"
      animationOut="fadeOut"
      animationInTiming={200}
      animationOutTiming={100}>
      <View
        style={tw`rounded-2xl bg-[${Color.Neutral.Sz700}] pt-8 pb-6 bg-[${Color.Transparency.Sz85}] border-[${Color.Neutral.Sz700}] relative`}>
        <Pressable style={tw`absolute top-3 right-3 `} onPress={handleModalClose}>
          <ModalCloseIcon />
        </Pressable>
        {children}
        <View style={tw`flex-row justify-between px-3.5`}>
          <View style={tw`w-41.5`}>
            <Button
              onPress={onLeftButtonPress}
              title={leftButtonTitle}
              textColor={Color.Tertiary.Sz900}
              backgroundColor={Color.Transparency.full}
              borderColor={Color.Primary.Sz650}
            />
          </View>
          {!isSingleButton && (
            <View style={tw`w-41.5`}>
              <Button
                onPress={onRightButtonPress}
                title={rightButtonTitle}
                textColor={Color.Neutral.Black}
                backgroundColor={Color.Tertiary.Sz900}
                borderColor={Color.Tertiary.Sz900}
              />
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
}
