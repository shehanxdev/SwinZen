import { View } from 'react-native';
import FastImage from 'react-native-fast-image';

import { Text } from '@sz/components';
import { tw } from '@sz/config';
import {
  Color,
  FaceOnGIF,
  HOW_TO_SHOOT_GIF_ASPECT_RATIO,
  LandscapeGIF,
  TextAlignment,
  TextVariant,
} from '@sz/constants';

export function HowToShootStepFour() {
  return (
    <View>
      <Text color={Color.Primary.Sz200} variant={TextVariant.Body1SemiBold} textAlign={TextAlignment.Auto}>
        {`Face-On/Hand-Held Instructions\n`}
      </Text>
      <Text color={Color.Neutral.White} variant={TextVariant.Body1Regular} textAlign={TextAlignment.Auto}>
        {`Have your buddy take 3 paces/9 ft from the ball, directly in front of the golfer. \n`}
      </Text>
      <FastImage
        style={[tw`w-full border-4 border-Neutral-White`, { aspectRatio: HOW_TO_SHOOT_GIF_ASPECT_RATIO }]}
        source={{ cache: FastImage.cacheControl.immutable, priority: FastImage.priority.high, uri: FaceOnGIF }}
      />
      <Text color={Color.Neutral.White} variant={TextVariant.Body1Regular} textAlign={TextAlignment.Auto}>
        {`\nHave your buddy take 3 paces/9 ft from the ball, directly in front of the golfer. \n`}
      </Text>
      <FastImage
        style={[tw`w-full border-4 border-Neutral-White`, { aspectRatio: HOW_TO_SHOOT_GIF_ASPECT_RATIO }]}
        source={{ cache: FastImage.cacheControl.immutable, priority: FastImage.priority.high, uri: LandscapeGIF }}
      />
    </View>
  );
}
