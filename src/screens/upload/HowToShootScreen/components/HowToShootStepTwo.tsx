import { View } from 'react-native';
import FastImage from 'react-native-fast-image';

import { Text } from '@sz/components';
import { tw } from '@sz/config';
import {
  Color,
  DownTheLineGIF,
  HOW_TO_SHOOT_GIF_ASPECT_RATIO,
  LandscapeGIF,
  TextAlignment,
  TextVariant,
} from '@sz/constants';

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
        style={[tw`w-full border-4 border-Neutral-White`, { aspectRatio: HOW_TO_SHOOT_GIF_ASPECT_RATIO }]}
        source={{ cache: FastImage.cacheControl.immutable, priority: FastImage.priority.high, uri: DownTheLineGIF }}
      />
      <Text color={Color.Neutral.White} variant={TextVariant.Body1Regular} textAlign={TextAlignment.Auto}>
        {`\nHave your buddy hold the phone in portrait mode.\n`}
      </Text>
      <FastImage
        style={[tw`w-full border-4 border-Neutral-White`, { aspectRatio: HOW_TO_SHOOT_GIF_ASPECT_RATIO }]}
        source={{ cache: FastImage.cacheControl.immutable, priority: FastImage.priority.high, uri: LandscapeGIF }}
      />
    </View>
  );
}
