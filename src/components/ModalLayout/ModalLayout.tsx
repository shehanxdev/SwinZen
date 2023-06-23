import React from 'react';
import { Pressable, View } from 'react-native';
import Modal from 'react-native-modal';

import { tw } from '@sz/config';
import { Color } from '@sz/constants';

import { Button } from '../Button';
import { CrossIcon } from '../Icon';

interface ModalLayoutProps {
  testID?: string;
  showModal: boolean;
  handleModalClose: () => void;
  children: React.ReactNode;
  isSingleButton?: boolean;
  showCloseIcon?: boolean;
  leftButtonTitle: string;
  rightButtonTitle: string;
  onLeftButtonPress: () => void;
  onRightButtonPress: () => void;
}

export function ModalLayout({
  testID,
  showModal,
  handleModalClose,
  children,
  showCloseIcon = false,
  isSingleButton = false,
  leftButtonTitle,
  rightButtonTitle,
  onLeftButtonPress,
  onRightButtonPress,
}: ModalLayoutProps) {
  return (
    <Modal
      testID={testID}
      isVisible={showModal}
      onBackButtonPress={handleModalClose}
      animationIn="fadeIn"
      animationOut="fadeOut"
      animationInTiming={200}
      animationOutTiming={100}>
      <View
        style={tw`rounded-2xl pt-6 pb-6 bg-[${Color.Transparency.Sz85}] border border-[${Color.Neutral.Sz700}] relative`}>
        {showCloseIcon && (
          <Pressable
            style={tw`absolute top-3 right-3 `}
            onPress={handleModalClose}
            testID={`${testID}-closeIconTestID`}>
            <CrossIcon width={13} height={13} />
          </Pressable>
        )}
        {children}
        <View style={tw`flex-row justify-between px-3.5 gap-2.5`}>
          {!isSingleButton && (
            <View style={tw`grow-1 basis-0}`}>
              <Button
                testID={`${testID}-leftButtonTestID`}
                onPress={onLeftButtonPress}
                title={leftButtonTitle}
                textColor={Color.Tertiary.Sz900}
                backgroundColor={Color.Transparency.full}
                borderColor={Color.Primary.Sz650}
              />
            </View>
          )}

          <View style={tw`${isSingleButton ? 'w-full' : 'grow-1 basis-0'}`}>
            <Button
              testID={`${testID}-rightButtonTestID`}
              onPress={onRightButtonPress}
              title={rightButtonTitle}
              textColor={Color.Neutral.Black}
              backgroundColor={Color.Tertiary.Sz900}
              borderColor={Color.Tertiary.Sz900}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}