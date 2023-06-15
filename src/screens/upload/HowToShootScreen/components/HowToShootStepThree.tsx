import { View } from 'react-native';
import FastImage from 'react-native-fast-image';

import { Text } from '@sz/components';
import { tw } from '@sz/config';
import { Color, FaceOnGIF, LandscapeGIF, TextAlignment, TextVariant, TripodHeightGIF } from '@sz/constants';

export function HowToShootStepThree() {
  return (
    <View>
      <Text color={Color.Primary.Sz200} variant={TextVariant.Body1SemiBold} textAlign={TextAlignment.Auto}>
        {`Face-On/Tripod Instructions\n`}
      </Text>
      <Text color={Color.Neutral.White} variant={TextVariant.Body1Regular} textAlign={TextAlignment.Auto}>
        {`Take 3 paces/9 ft from the ball, directly in front of the golfer.\n`}
      </Text>
      <FastImage
        style={tw`w-89.5 h-51.5 border-4 border-Neutral-White`}
        source={{ cache: FastImage.cacheControl.immutable, priority: FastImage.priority.high, uri: FaceOnGIF }}
      />
      <Text color={Color.Neutral.White} variant={TextVariant.Body1Regular} textAlign={TextAlignment.Auto}>
        {`\nSet your tripod 4-5 feet high.\n`}
      </Text>
      <FastImage
        style={tw`w-89.5 h-51.5 border-4 border-Neutral-White`}
        source={{ cache: FastImage.cacheControl.immutable, priority: FastImage.priority.high, uri: TripodHeightGIF }}
      />
      <Text color={Color.Neutral.White} variant={TextVariant.Body1Regular} textAlign={TextAlignment.Auto}>
        {`\nPosition your phone in landscape mode.\n`}
      </Text>
      <FastImage
        style={tw`w-89.5 h-51.5 border-4 border-Neutral-White`}
        source={{ cache: FastImage.cacheControl.immutable, priority: FastImage.priority.high, uri: LandscapeGIF }}
      />
    </View>
  );
}
