import React from 'react';
import { View } from 'react-native';

import { Text } from '@sz/components';
import { tw } from '@sz/config';
import { TextAlignment, TextVariant } from '@sz/constants';

import { BaseInfoScreen } from '../../components';

export function UTAInfoTwoScreen() {
  return (
    <BaseInfoScreen>
      <View style={tw`px-4 py-6`} testID="UTAInfoTwoScreenTestID">
        <Text variant={TextVariant.Body2Regular} textAlign={TextAlignment.Auto}>
          UTAInfoTwoScreen
        </Text>
      </View>
    </BaseInfoScreen>
  );
}
