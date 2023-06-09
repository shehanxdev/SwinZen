import React from 'react';
import { View } from 'react-native';

import { Text } from '@sz/components';
import { tw } from '@sz/config';
import { Color, TextAlignment, TextVariant } from '@sz/constants';

import { BaseScreen } from '../../../components';

export function ASZInfoThreeScreen() {
  return (
    <BaseScreen>
      <View style={tw`mx-4 mt-8`} testID="ASZInfoThreeScreenTestID">
        <Text color={Color.Neutral.White} variant={TextVariant.Body1Regular} textAlign={TextAlignment.Auto}>
          {`If you have an iPhone, you have the capabilities to shoot videos at 240fps. All moderately recent versions of the iPhone have this capability, and most newer Android phones have this capability, as well. Over the last few years, Android phone manufacturers have begun providing at least 120fps slow-motion if not 240fps.
          \nIf your Android phone doesn’t have the capabilities of shooting video at 240fps but can shoot at 120fps, then all the analytics and tracking will work except for speed calculations.
          \nAfter downloading SwingZen you should have gotten a notification if you do not have the capabilities described above. If no notification, you’re good to go.
          \nIn this situation, you will either need to upgrade your phone or cancel your subscription. We’re so sorry for the inconvenience this may cause some users.`}
        </Text>
      </View>
    </BaseScreen>
  );
}
