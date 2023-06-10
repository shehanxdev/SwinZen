import { View } from 'react-native';
import FastImage from 'react-native-fast-image';

import { Text } from '@sz/components';
import { tw } from '@sz/config';
import { Color, DownTheLineImageUrl, FaceOnImageUrl, TextAlignment, TextVariant } from '@sz/constants';

export function ShootingSetupStepTwo() {
  return (
    <View>
      <Text color={Color.Primary.Sz200} variant={TextVariant.Body1SemiBold} textAlign={TextAlignment.Auto}>
        {`Tip Number Two:\n`}
      </Text>
      <Text color={Color.Neutral.White} variant={TextVariant.Body1Regular} textAlign={TextAlignment.Auto}>
        {`When shooting The Down The Line shot, the camera/phone must be held at 4 paces away (12ft/4M) from the ball. Position behind the ball pointing toward the target in the distance with the ball in line.\n`}
      </Text>
      <FastImage
        style={tw`w-full h-53.75 border-8 border-Neutral-White`}
        source={{
          cache: FastImage.cacheControl.immutable,
          priority: FastImage.priority.high,
          uri: DownTheLineImageUrl,
        }}
      />
      <Text color={Color.Neutral.White} variant={TextVariant.Body1Regular} textAlign={TextAlignment.Auto}>
        {`\nIn The Face On perspective, the camera/phone needs to be 4 paces (9ft/3M) from the ball, not the golfer, but centered on the golfer.\n`}
      </Text>
      <FastImage
        style={tw`w-full h-53.75 border-8 border-Neutral-White`}
        source={{
          cache: FastImage.cacheControl.immutable,
          priority: FastImage.priority.high,
          uri: FaceOnImageUrl,
        }}
      />
    </View>
  );
}
