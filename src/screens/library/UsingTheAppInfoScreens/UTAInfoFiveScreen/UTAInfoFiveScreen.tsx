import React from 'react';
import { View } from 'react-native';

import { Text } from '@sz/components';
import { tw } from '@sz/config';
import { Color, TextAlignment, TextVariant } from '@sz/constants';

import { BaseLibraryScreen } from '../../components';

export function UTAInfoFiveScreen() {
  return (
    <BaseLibraryScreen>
      <View style={tw`mx-4 mt-8`} testID="UTAInfoFiveScreenTestID">
        <Text color={Color.Neutral.White} variant={TextVariant.Body1Regular} textAlign={TextAlignment.Auto}>
          {`Note that if you don’t have either a wifi connection or a good cell phone reception, the video upload will be delayed. The system will keep the video in memory until you get a good data connection. It will automatically upload the video to the analyzer at that point.
          \nThe analyzer usually takes about 1- 2 minutes to deliver the analytic results back to your app. This can vary based on your upload speed and the load on servers.`}
        </Text>
      </View>
    </BaseLibraryScreen>
  );
}
