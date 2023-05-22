import React from 'react';
import { View } from 'react-native';

import { Text } from '@sz/components';
import { tw } from '@sz/config';
import { Color, TextAlignment, TextVariant } from '@sz/constants';

import { BaseInfoScreen } from '../../components';

export function UTAInfoTwelveScreen() {
  return (
    <BaseInfoScreen>
      <View style={tw`mx-4 mt-8`} testID="UTAInfoTwelveScreenTestID">
        <Text color={Color.Neutral.White} variant={TextVariant.Body1Regular} textAlign={TextAlignment.Auto}>
          <Text color={Color.Neutral.White} variant={TextVariant.Body1SemiBold} textAlign={TextAlignment.Auto}>
            AI Pro Analysis{' '}
            <Text color={Color.Neutral.White} variant={TextVariant.Body1Regular} textAlign={TextAlignment.Auto}>
              (available with paid subscription)
            </Text>
          </Text>
          {`\nOur AI analysis system has been designed by experienced PGA qualified professionals to break down the swing into multiple segments. Each checkpoint determines a specific frame in the swing that is relevant to that checkpoint and compares it to the standard set by our Instruction Pros. If your position is good, then great! If not, you will then have the information through AI Pro Tips, Pro vs You, PGA instruction videos, and drills to correct that specific swing fault.\n\n`}
          <Text color={Color.Neutral.White} variant={TextVariant.Body1SemiBold} textAlign={TextAlignment.Auto}>
            AI-Pro Tip Video Instructions
          </Text>
          {`\nThere’s an extensive library of video tutorials that go into all aspects of the game from the mental game, putting, and short game.
          \nCheck it out to improve your scores on the course.\n\n`}
          <Text color={Color.Neutral.White} variant={TextVariant.Body1SemiBold} textAlign={TextAlignment.Auto}>
            AI-Pro Tip Comparison - You versus Pro
          </Text>
          {`\nIt is great to be able to see what a correct position would look like.
          \nSwingZen delivers a comparison screenshot of what a pro’s position looks like at that particular point in the swing.`}
        </Text>
      </View>
    </BaseInfoScreen>
  );
}
