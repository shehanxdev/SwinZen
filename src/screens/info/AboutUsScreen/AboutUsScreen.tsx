import React from 'react';
import { View } from 'react-native';

import { Text } from '@sz/components';
import { tw } from '@sz/config';
import { AboutUsPoints, Color, TextAlignment, TextVariant } from '@sz/constants';

import { BaseInfoScreen } from '../components';

export function AboutUsScreen() {
  return (
    <BaseInfoScreen testID="AboutUsScreenTestID">
      <View style={tw`flex-1 bg-[${Color.Primary.Sz900}]/46 rounded-2.5 mx-4 mt-6.25 mb-24 p-6`}>
        <Text variant={TextVariant.Body2Regular} textAlign={TextAlignment.Auto}>
          SwingZen is a new app technology utilizing a cutting-edge biomechanical feedback analytics system to track the
          range of motion of a golfer’s body, club, and swing dynamics from any smartphone. No expensive doppler or
          sensors needed!
        </Text>
        {AboutUsPoints.map((data, index) => (
          <View key={index} style={tw`flex-row gap-2 mt-4 ml-3`}>
            <Text variant={TextVariant.Body2Regular} textAlign={TextAlignment.Auto}>
              {`\u2022`}
            </Text>
            <Text variant={TextVariant.Body2Regular} textAlign={TextAlignment.Auto}>
              {data}
            </Text>
          </View>
        ))}
      </View>
    </BaseInfoScreen>
  );
}
