import { View } from 'react-native';
import FastImage from 'react-native-fast-image';

import { Text } from '@sz/components';
import { tw } from '@sz/config';
import { Color, DownTheLineGIF, LandscapeGIF, TextAlignment, TextVariant } from '@sz/constants';

export function HowToShootStepTwo() {
  return (
    <View>
      <Text color={Color.Primary.Sz200} variant={TextVariant.Body1SemiBold} textAlign={TextAlignment.Auto}>
        {`Down The Line/Hand-Held Instructions\n`}
      </Text>
      <Text color={Color.Neutral.White} variant={TextVariant.Body1Regular} textAlign={TextAlignment.Auto}>
        {`Have your buddy take 4 paces/12 ft behind the ball pointing towards the target.\n`}
      </Text>
      <FastImage
        style={tw`w-full h-51.5 border-4 border-Neutral-White`}
        source={{ cache: FastImage.cacheControl.immutable, priority: FastImage.priority.high, uri: DownTheLineGIF }}
      />
      <Text color={Color.Neutral.White} variant={TextVariant.Body1Regular} textAlign={TextAlignment.Auto}>
        {`\nHave your buddy hold the phone in portrait mode.\n`}
      </Text>
      <FastImage
        style={tw`w-full h-51.5 border-4 border-Neutral-White`}
        source={{ cache: FastImage.cacheControl.immutable, priority: FastImage.priority.high, uri: LandscapeGIF }}
      />
    </View>
  );
}
