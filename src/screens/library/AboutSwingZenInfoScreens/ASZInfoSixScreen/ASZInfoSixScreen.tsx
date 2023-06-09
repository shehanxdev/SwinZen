import React, { useMemo } from 'react';
import { View } from 'react-native';

import { Text } from '@sz/components';
import { tw } from '@sz/config';
import { Color, TextAlignment, TextVariant } from '@sz/constants';

import { BaseScreen } from '../../../components';

const TEST_ID_PREFIX = 'ASZInfoSixScreenTestID';

export function ASZInfoSixScreen() {
  const AboutSZInfoSixPoints = [];

  const renderPoints = useMemo(() => {
    return AboutSZInfoSixPoints.map(data => (
      <View key={`${TEST_ID_PREFIX}-Point-${data.title}`}>
        <Text color={Color.Neutral.White} variant={TextVariant.Body1SemiBold} textAlign={TextAlignment.Auto}>
          {data.title}
        </Text>
        <Text color={Color.Neutral.White} variant={TextVariant.Body1Regular} textAlign={TextAlignment.Auto}>
          {data.body}
          {`\n`}
        </Text>
      </View>
    ));
  }, [AboutSZInfoSixPoints]);

  return (
    <BaseScreen>
      <View style={tw`mx-4 mt-8`} testID={TEST_ID_PREFIX}>
        {renderPoints}
      </View>
    </BaseScreen>
  );
}
