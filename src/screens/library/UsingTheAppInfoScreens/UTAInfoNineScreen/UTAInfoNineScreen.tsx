import React from 'react';
import { View } from 'react-native';

import { Text } from '@sz/components';
import { tw } from '@sz/config';
import { Color, TextAlignment, TextVariant } from '@sz/constants';

import { BaseLibraryScreen } from '../../components';

export function UTAInfoNineScreen() {
  return (
    <BaseLibraryScreen>
      <View style={tw`mx-4 mt-8`} testID="UTAInfoNineScreenTestID">
        <Text color={Color.Neutral.White} variant={TextVariant.Body1Regular} textAlign={TextAlignment.Auto}>
          {`Face On perspective is where you will receive swing data such as swing speed, ball speed, smash factor and launch angle.
          \nSmash factor is a formula that combines ball speed and swing speed. This calculation shows the effectiveness of your ball impact. The higher ball speed compared to swing speed, the higher the smash factor.1.5 is the goal.`}
        </Text>
      </View>
    </BaseLibraryScreen>
  );
}
