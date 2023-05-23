import React from 'react';
import { View } from 'react-native';

import { Text } from '@sz/components';
import { tw } from '@sz/config';
import { Color, TextAlignment, TextVariant } from '@sz/constants';

import { BaseLibraryScreen } from '../../components';

export function UTAInfoTenScreen() {
  return (
    <BaseLibraryScreen>
      <View style={tw`mx-4 mt-8`} testID="UTAInfoTenScreenTestID">
        <Text color={Color.Neutral.White} variant={TextVariant.Body1Regular} textAlign={TextAlignment.Auto}>
          {`SwingZen’s concept of AI Pro instruction is to provide a similar process of instruction that any PGA/LPGA Pro would utilize.
          \nThe first step in building a quality swing is to start with your setup. Setup is your swing foundation. Once you get that right you can build off of it. Your AI Pro swing results are listed in priority starting with setup and progressing through the swing. Before you focus on the next thing, master the first priority item and then move on to the next.`}
        </Text>
      </View>
    </BaseLibraryScreen>
  );
}
