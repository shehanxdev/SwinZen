import React from 'react';
import { View } from 'react-native';

import { Text } from '@sz/components';
import { tw } from '@sz/config';
import { Color, TextAlignment, TextVariant } from '@sz/constants';

import { BaseMainScreen } from '../../../main/components';

export function ASZInfoTwoScreen() {
  return (
    <BaseMainScreen>
      <View style={tw`mx-4 mt-8`} testID="ASZInfoTwoScreenTestID">
        <Text color={Color.Neutral.White} variant={TextVariant.Body1Regular} textAlign={TextAlignment.Auto}>
          {`The SwingZen system captures and analyzes videos in 120/240fps. This is up to eight times more frames than other app-based systems!
          \nRecording and analyzing ultra slo-mo videos is a must to be able to provide the detailed and accurate feedback that our app delivers. This includes the swing data such as club and ball speed, along with smash factor and launch angle.
          \nNo other AI system in the world delivers these capabilities.`}
        </Text>
      </View>
    </BaseMainScreen>
  );
}
