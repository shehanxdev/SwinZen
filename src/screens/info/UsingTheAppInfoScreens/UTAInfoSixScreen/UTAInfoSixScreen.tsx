import React from 'react';
import { View } from 'react-native';

import { Text } from '@sz/components';
import { tw } from '@sz/config';
import { Color, TextAlignment, TextVariant } from '@sz/constants';

import { BaseInfoScreen } from '../../components';

export function UTAInfoSixScreen() {
  return (
    <BaseInfoScreen>
      <View style={tw`mx-4 mt-8`} testID="UTAInfoSixScreenTestID">
        <Text color={Color.Neutral.White} variant={TextVariant.Body1Regular} textAlign={TextAlignment.Auto}>
          {`Did your video come back as successfully reviewed?
          \nFrom the Home Page of the app, you can select the dark green button toward the bottom of the screen that says “Video Uploads.”
          \nEach successful review will show a green overlay, indicating that our system has properly analyzed the video and has feedback for you to review.
          \nSimply tap on the center of the video, and it will take you to the video’s swing feedback report.`}
        </Text>
      </View>
    </BaseInfoScreen>
  );
}
