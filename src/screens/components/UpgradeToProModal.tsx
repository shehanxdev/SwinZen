import React from 'react';
import { View } from 'react-native';

import { ModalLayout, Text } from '@sz/components';
import { tw } from '@sz/config';
import { Color, Route, TextVariant } from '@sz/constants';
import { NavigationService } from '@sz/services';
import { useDispatch, useSelector } from '@sz/stores';

export function UpgradeToProModal() {
  const isVisible = useSelector(state => state.appStore.isUpgradeModalVisible);

  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch.appStore.setUpgradeModalVisible(false);
  };

  return (
    <ModalLayout
      showModal={isVisible}
      handleModalClose={closeModal}
      leftButtonTitle="CANCEL"
      rightButtonTitle="UPGRADE PLAN"
      onLeftButtonPress={closeModal}
      onRightButtonPress={() => {
        closeModal();
        setTimeout(() => NavigationService.navigate(Route.PricePlans), 200);
      }}>
      <View style={tw`mb-3 px-12.5`}>
        <Text variant={TextVariant.Body1SemiBold} color={Color.Neutral.White}>
          Bring your swing to the next level with a Pro Upgrade!
        </Text>
      </View>
      <View style={tw`mb-8 px-4 flex flex-col gap-3`}>
        <Text variant={TextVariant.Body2Regular} color={Color.Neutral.White}>
          You'll experience unlimited monthly uploads, Priority and Analysis data feedback, and much more. To access
          premium features, please upgrade your plan today.
        </Text>
      </View>
    </ModalLayout>
  );
}
