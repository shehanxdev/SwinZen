import { View } from 'react-native';
import FastImage from 'react-native-fast-image';

import { Text } from '@sz/components';
import { tw } from '@sz/config';
import { Color, FaceOnGIF, LandscapeGIF, TextAlignment, TextVariant } from '@sz/constants';

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
        style={tw`w-full h-51.5 border-4 border-Neutral-White`}
        source={{ cache: FastImage.cacheControl.immutable, priority: FastImage.priority.high, uri: FaceOnGIF }}
      />
      <Text color={Color.Neutral.White} variant={TextVariant.Body1Regular} textAlign={TextAlignment.Auto}>
        {`\nHave your buddy take 3 paces/9 ft from the ball, directly in front of the golfer. \n`}
      </Text>
      <FastImage
        style={tw`w-full h-51.5 border-4 border-Neutral-White`}
        source={{ cache: FastImage.cacheControl.immutable, priority: FastImage.priority.high, uri: LandscapeGIF }}
      />
    </View>
  );
}
