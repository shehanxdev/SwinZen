import React from 'react';
import { View } from 'react-native';

import { ModalLayout, Text } from '@sz/components';
import { tw } from '@sz/config';
import { Color, Route, TextVariant } from '@sz/constants';
import { NavigationService } from '@sz/services';

export function AnalysisReportModal({ showModal, handleModalClose }) {
  return (
    <ModalLayout
      showModal={showModal}
      handleModalClose={handleModalClose}
      leftButtonTitle="CANCEL"
      rightButtonTitle="UPGRADE PLAN"
      onLeftButtonPress={handleModalClose}
      onRightButtonPress={() => {
        handleModalClose();
        NavigationService.navigate(Route.PricePlans);
      }}>
      <View style={tw`mb-3 px-12.5`}>
        <Text variant={TextVariant.Body1SemiBold} color={Color.Neutral.White}>
          Bring your swing to the next level with a Pro Upgrade!{' '}
        </Text>
      </View>
      <View style={tw`mb-11 p-[10]`}>
        <Text variant={TextVariant.Body1Regular}>
          You'll experience unlimited monthly uploads, Priority and Analysis data feedback, and much more. To access
          premium features, please upgrade your plan today.
        </Text>
      </View>
    </ModalLayout>
  );
}
