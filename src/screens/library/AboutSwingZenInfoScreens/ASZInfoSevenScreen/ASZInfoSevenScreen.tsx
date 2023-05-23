import React from 'react';
import { View } from 'react-native';

import { Text } from '@sz/components';
import { tw } from '@sz/config';
import { AboutSZInfoSevenPoints, Color, TextAlignment, TextVariant } from '@sz/constants';

import { BaseLibraryScreen } from '../../components';

const TEST_ID_PREFIX = 'ASZInfoSevenScreenTestID';

export function ASZInfoSevenScreen() {
  return (
    <BaseLibraryScreen>
      <View style={tw`mx-4 mt-8`} testID={TEST_ID_PREFIX}>
        <Text color={Color.Neutral.White} variant={TextVariant.Body1SemiBold} textAlign={TextAlignment.Auto}>
          {`Note this is available only with paid subscription.\n`}
        </Text>
        {AboutSZInfoSevenPoints.map((data, index) => (
          <View key={`${TEST_ID_PREFIX}-Point-${index}`}>
            <Text color={Color.Neutral.White} variant={TextVariant.Body1SemiBold} textAlign={TextAlignment.Auto}>
              {data.title}
            </Text>
            <Text color={Color.Neutral.White} variant={TextVariant.Body1Regular} textAlign={TextAlignment.Auto}>
              {data.body}
              {`\n`}
            </Text>
          </View>
        ))}
      </View>
    </BaseLibraryScreen>
  );
}
