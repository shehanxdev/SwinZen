import React from 'react';
import { View } from 'react-native';

import { Text } from '@sz/components';
import { tw } from '@sz/config';
import { Color, TextAlignment, TextVariant } from '@sz/constants';

import { BaseMainScreen } from '../../../main/components';

export function UTAInfoThreeScreen() {
  return (
    <BaseMainScreen>
      <View style={tw`mx-4 mt-8`} testID="UTAInfoThreeScreenTestID">
        <Text color={Color.Neutral.White} variant={TextVariant.Body1Regular} textAlign={TextAlignment.Auto}>
          {`Vibrant colors also can help with indoor (and even outdoor) shooting.
          \nWe have provided a “hack” that can help improve the results by training the system to recognize bright fluorescent colors on the clubhead and ball.
          \nIf you use vibrant tape on the clubhead and a vibrant colored ball you can get better results in marginal conditions, such as bad lighting. In most situations this isn’t necessary.`}
        </Text>
      </View>
    </BaseMainScreen>
  );
}
