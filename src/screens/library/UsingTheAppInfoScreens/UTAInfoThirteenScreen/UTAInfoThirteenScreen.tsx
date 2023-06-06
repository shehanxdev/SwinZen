import React from 'react';
import { View } from 'react-native';

import { Text } from '@sz/components';
import { tw } from '@sz/config';
import { Color, TextAlignment, TextVariant } from '@sz/constants';

import { BaseMainScreen } from '../../../main/components';

export function UTAInfoThirteenScreen() {
  return (
    <BaseMainScreen>
      <View style={tw`mx-4 mt-8`} testID="UTAInfoThirteenScreenTestID">
        <Text color={Color.Neutral.White} variant={TextVariant.Body1Regular} textAlign={TextAlignment.Auto}>
          {`Keep up with your progress by reviewing a snapshot of your swing results this month as compared to last month.
          \nToggle through month-by-month to see how your scores improve over time, and identify areas of your swing that could be improved.`}
        </Text>
      </View>
    </BaseMainScreen>
  );
}
