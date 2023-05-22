import React from 'react';
import { View } from 'react-native';

import { Text } from '@sz/components';
import { tw } from '@sz/config';
import { TextAlignment, TextVariant } from '@sz/constants';

import { BaseInfoScreen } from '../../components';

export function UTAInfoThreeScreen() {
  return (
    <BaseInfoScreen>
      <View style={tw`px-4 py-6`} testID="UTAInfoThreeScreenTestID">
        <Text variant={TextVariant.Body2Regular} textAlign={TextAlignment.Auto}>
          UTAInfoThreeScreen
        </Text>
      </View>
    </BaseInfoScreen>
  );
}
