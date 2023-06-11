import { View } from 'react-native';

import { Text } from '@sz/components';
import { Color, TextAlignment, TextVariant } from '@sz/constants';

export function ShootingSetupStepThree() {
  return (
    <View>
      <Text color={Color.Primary.Sz200} variant={TextVariant.Body1SemiBold} textAlign={TextAlignment.Auto}>
        {`Tip Number Three:\n`}
      </Text>
      <Text color={Color.Neutral.White} variant={TextVariant.Body1Regular} textAlign={TextAlignment.Auto}>
        {`When shooting your video, you should be able to get the golfer, clubhead, and ball fully in the frame.
          \nIf you lose the clubhead at the top of the swing slightly that is OK. It won’t affect your results.
          \nThe best position for the ball, however, is just above the bottom of the camera frame.`}
      </Text>
    </View>
  );
}
