import { View } from 'react-native';
import FastImage from 'react-native-fast-image';

import { Text } from '@sz/components';
import { tw } from '@sz/config';
import { Color, LandscapeImageUrl, TextAlignment, TextVariant } from '@sz/constants';

export function ShootingSetupStepOne() {
  return (
    <View>
      <Text color={Color.Neutral.White} variant={TextVariant.Body1Regular} textAlign={TextAlignment.Auto}>
        {` When setting up to shoot a video with a tripod (4-5ft height) or a buddy holding the phone, keep in mind these simple tips.\n`}
      </Text>
      <Text color={Color.Primary.Sz200} variant={TextVariant.Body1SemiBold} textAlign={TextAlignment.Auto}>
        {`Tip Number One:\n`}
      </Text>
      <Text color={Color.Neutral.White} variant={TextVariant.Body1Regular} textAlign={TextAlignment.Auto}>
        {`ALWAYS hold your phone in Landscape, NOT in Portrait. We understand that it feels more natural to hold the phone upright, but typically you cannot capture the full range of motion of your swing. Those frames that aren’t caught when the ball and club are outside the camera shot are crucial to getting the best data feedback on your swing.\n`}
      </Text>
      <FastImage
        style={[tw`w-full border-8 border-Neutral-White`, { aspectRatio: 358 / 193 }]}
        source={{
          cache: FastImage.cacheControl.immutable,
          priority: FastImage.priority.high,
          uri: LandscapeImageUrl,
        }}
      />
    </View>
  );
}
