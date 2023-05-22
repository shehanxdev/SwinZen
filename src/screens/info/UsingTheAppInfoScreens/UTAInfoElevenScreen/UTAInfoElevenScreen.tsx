import React from 'react';
import { View } from 'react-native';

import { Text } from '@sz/components';
import { tw } from '@sz/config';
import { Color, TextAlignment, TextVariant } from '@sz/constants';

import { BaseInfoScreen } from '../../components';

export function UTAInfoElevenScreen() {
  return (
    <BaseInfoScreen>
      <View style={tw`mx-4 mt-8`} testID="UTAInfoElevenScreenTestID">
        <Text color={Color.Neutral.White} variant={TextVariant.Body1Regular} textAlign={TextAlignment.Auto}>
          {`SwingZen scores pass/fail and help you track your progress.
          \nIf you fail a certain checkpoint, you can progress to view the instructions on how to improve that portion of the swing. If your position is good, then great! If not, you will then have the information through AI Pro Tips, Pro vs you, PGA instruction videos, and drills to correct that specific swing fault.`}
        </Text>
      </View>
    </BaseInfoScreen>
  );
}
