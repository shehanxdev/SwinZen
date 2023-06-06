import React from 'react';
import { View } from 'react-native';

import { ModalLayout, Text } from '@sz/components';
import { tw } from '@sz/config';
import { Color, TextVariant } from '@sz/constants';

interface InstructionsSkipModalProps {
  testID?: string;
  showModal: boolean;
  handleModalClose: () => void;
  onSkipped: () => void;
}

export function InstructionsSkipModal({
  testID = 'PlanSubscriptionCardTestID',
  showModal,
  handleModalClose,
  onSkipped,
}: InstructionsSkipModalProps) {
  return (
    <View testID={testID}>
      <ModalLayout
        showModal={showModal}
        handleModalClose={handleModalClose}
        leftButtonTitle="YES"
        rightButtonTitle="NO"
        onLeftButtonPress={onSkipped}
        onRightButtonPress={handleModalClose}>
        <View style={tw`mb-3 px-12.5`}>
          <Text variant={TextVariant.Body1SemiBold} color={Color.Neutral.White}>
            Always skip instructions?
          </Text>
        </View>
        <View style={tw`mb-11 p-[10]`}>
          <Text variant={TextVariant.Body1Regular}>
            If you want to skip the instructions with future uploads, select YES. If you want to keep seeing the
            instructions with every upload, select NO.
          </Text>
        </View>
      </ModalLayout>
    </View>
  );
}
