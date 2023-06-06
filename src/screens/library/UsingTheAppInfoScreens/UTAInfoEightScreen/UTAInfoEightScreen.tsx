import React, { useMemo } from 'react';
import { View } from 'react-native';

import { Text } from '@sz/components';
import { tw } from '@sz/config';
import { Color, TextAlignment, TextVariant, UTAInfoEightPoints } from '@sz/constants';

import { BaseMainScreen } from '../../../main/components';

const TEST_ID_PREFIX = 'UTAInfoEightScreenTestID';

export function UTAInfoEightScreen() {
  const renderPoints = useMemo(() => {
    return UTAInfoEightPoints.map((data, index) => (
      <View key={`${TEST_ID_PREFIX}-Point-${data.title}`} style={tw`flex-1 ml-2`}>
        <View style={tw`flex-row gap-3`}>
          <Text color={Color.Neutral.White} variant={TextVariant.Body1Regular} textAlign={TextAlignment.Auto}>
            {index + 1}.
          </Text>
          <Text color={Color.Neutral.White} variant={TextVariant.Body1SemiBold} textAlign={TextAlignment.Auto}>
            {data.title}
          </Text>
        </View>
        <View style={tw`ml-6`}>
          <Text color={Color.Neutral.White} variant={TextVariant.Body1Regular} textAlign={TextAlignment.Auto}>
            {data.body}
            {`\n`}
          </Text>
        </View>
      </View>
    ));
  }, [UTAInfoEightPoints]);

  return (
    <BaseMainScreen>
      <View style={tw`mx-4 mt-8`} testID={TEST_ID_PREFIX}>
        <Text color={Color.Neutral.White} variant={TextVariant.Body1Regular} textAlign={TextAlignment.Auto}>
          {`The key components of your swing analysis are:\n`}
        </Text>
        {renderPoints}
      </View>
    </BaseMainScreen>
  );
}
