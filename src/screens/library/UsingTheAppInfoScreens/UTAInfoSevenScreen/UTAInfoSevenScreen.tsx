import React, { useMemo } from 'react';
import { View } from 'react-native';

import { Text } from '@sz/components';
import { tw } from '@sz/config';
import { Color, TextAlignment, TextVariant, UTAInfoSevenPoints } from '@sz/constants';

import { BaseMainScreen } from '../../../main/components';

const TEST_ID_PREFIX = 'UTAInfoSevenScreenTestID';

export function UTAInfoSevenScreen() {
  const renderPoints = useMemo(() => {
    return UTAInfoSevenPoints.map((data, index) => (
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
  }, [UTAInfoSevenPoints]);

  return (
    <BaseMainScreen>
      <View style={tw`mx-4 mt-8`} testID={TEST_ID_PREFIX}>
        <Text color={Color.Neutral.White} variant={TextVariant.Body1Regular} textAlign={TextAlignment.Auto}>
          {`What does the orange triangle with an exclamation mark and/or orange overlay on a video mean?
          \nThis color code indicates that a video failed to review properly.
          \nHere is a list of all the reasons why a video could have failed to review.\n`}
        </Text>
        {renderPoints}
      </View>
    </BaseMainScreen>
  );
}
