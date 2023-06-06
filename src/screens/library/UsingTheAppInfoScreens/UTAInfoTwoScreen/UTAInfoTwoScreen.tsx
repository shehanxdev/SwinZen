import React from 'react';
import { View } from 'react-native';

import { Text } from '@sz/components';
import { tw } from '@sz/config';
import { Color, TextAlignment, TextVariant } from '@sz/constants';

import { BaseMainScreen } from '../../../main/components';

export function UTAInfoTwoScreen() {
  return (
    <BaseMainScreen>
      <View style={tw`mx-4 mt-8`} testID="UTAInfoTwoScreenTestID">
        <Text color={Color.Neutral.White} variant={TextVariant.Body1Regular} textAlign={TextAlignment.Auto}>
          {`Our AI programming requires the system to be able to identify and differentiate a golfer, club, and ball from the surrounding environment.
          \nUsually, the driving range or course provides the least amount of background distractions and usually has better lighting conditions than indoors.
          \nYou can have good results outdoors and not be at a course or driving range. The only thing that is necessary is to minimize the amount of clutter in the background and shoot in good lighting conditions.\n\n`}
          <Text color={Color.Neutral.White} variant={TextVariant.Body1SemiBold} textAlign={TextAlignment.Auto}>
            Ideal Outdoor Shooting
          </Text>
          {`\nAn example of an ideal shooting condition outdoors would be in a wide-open green space with nothing behind the golfer, ideally with no other people or balls in the shot. That being said, in life few things are ideal, so the system is trained to ignore the distant background.\n\n`}
          <Text color={Color.Neutral.White} variant={TextVariant.Body1SemiBold} textAlign={TextAlignment.Auto}>
            Ideal Indoor Shooting
          </Text>
          {`\nYou can similarly shoot indoors, but a major problem with indoor environments can be the lack of space to shoot the proper distance from the ball. Not having the proper distance from the ball cuts off the range of motion of a full swing, which means our system cannot pick up those frames when the ball and club leave the perimeters of the camera shot.`}
        </Text>
      </View>
    </BaseMainScreen>
  );
}
