import React from 'react';
import { View } from 'react-native';

import { Text } from '@sz/components';
import { tw } from '@sz/config';
import { Color, TextAlignment, TextVariant } from '@sz/constants';

import { BaseLibraryScreen } from '../../components';

export function ASZInfoOneScreen() {
  return (
    <BaseLibraryScreen>
      <View style={tw`mx-4 mt-8`} testID="ASZInfoOneScreenTestID">
        <Text color={Color.Neutral.White} variant={TextVariant.Body1Regular} textAlign={TextAlignment.Auto}>
          SwingZen is a state-of-the-art AI-enhanced golf training system. Our emphasis is on bringing the most advanced
          tools directly to the golfer with only a smartphone and at an affordable cost.
        </Text>
      </View>
    </BaseLibraryScreen>
  );
}
