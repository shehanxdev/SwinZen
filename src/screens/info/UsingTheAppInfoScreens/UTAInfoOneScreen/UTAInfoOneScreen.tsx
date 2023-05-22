import React from 'react';
import { View } from 'react-native';

import { Text } from '@sz/components';
import { tw } from '@sz/config';
import { Color, TextAlignment, TextVariant } from '@sz/constants';

import { BaseInfoScreen } from '../../components';

export function UTAInfoOneScreen() {
  return (
    <BaseInfoScreen>
      <View style={tw`mx-4 mt-8`} testID="UTAInfoOneScreenTestID">
        <Text color={Color.Neutral.White} variant={TextVariant.Body1Regular} textAlign={TextAlignment.Auto}>
          {`Now that you know why our app stands out from the crowd and why our user experience is designed the way it is, it's time to learn how to set up, record, and analyze your videos.
          \nBut first, keep this in mind as you are learning how to use the SwingZen app system:
          \nIt doesn’t matter if it is a $20,000 launch monitor or an in-app swing analyzer system like ours, understanding how to properly use the system will help provide the best results. The SwingZen app is designed to help you through the process with our new In-App-Capture technology, but again knowledge is power!
          \nBefore you record your first swing video, follow these tips to make sure the environment you are recording will assist in getting the best feedback.`}
        </Text>
      </View>
    </BaseInfoScreen>
  );
}
