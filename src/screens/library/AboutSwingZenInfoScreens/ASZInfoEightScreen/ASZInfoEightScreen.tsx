import { useNavigation } from '@react-navigation/native';
import React, { useLayoutEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';

import { BackIcon, Button, StepsOneIcon, StepsTwoFirstIcon, StepsTwoSecondIcon, Text } from '@sz/components';
import { tw } from '@sz/config';
import { Color, TextAlignment, TextVariant } from '@sz/constants';
import { NavigationService } from '@sz/services';

import { BaseLibraryScreen } from '../../components';

const TEST_ID_PREFIX = 'ASZInfoEightScreenTestID';

export function ASZInfoEightScreen() {
  const [count, setCount] = useState(0);

  const navigation = useNavigation();

  // custom action for navigation header back button
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            if (count > 0) {
              setCount(count - 1);
            } else {
              NavigationService.goBack();
            }
          }}
          style={tw`py-2.5 pr-2.5`}>
          <BackIcon />
        </TouchableOpacity>
      ),
    });
  });

  const StepOneContent = () => {
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
        <StepsOneIcon />
      </View>
    );
  };

  const StepTwoContent = () => {
    return (
      <View>
        <Text color={Color.Primary.Sz200} variant={TextVariant.Body1SemiBold} textAlign={TextAlignment.Auto}>
          {`Tip Number Two:\n`}
        </Text>
        <Text color={Color.Neutral.White} variant={TextVariant.Body1Regular} textAlign={TextAlignment.Auto}>
          {`When shooting The Down The Line shot, the camera/phone must be held at 4 paces away (12ft/4M) from the ball. Position behind the ball pointing toward the target in the distance with the ball in line.\n`}
        </Text>
        <StepsTwoFirstIcon />
        <Text color={Color.Neutral.White} variant={TextVariant.Body1Regular} textAlign={TextAlignment.Auto}>
          {`\nIn The Face On perspective, the camera/phone needs to be 4 paces (9ft/3M) from the ball, not the golfer, but centered on the golfer.\n`}
        </Text>
        <StepsTwoSecondIcon />
      </View>
    );
  };

  const StepThreeContent = () => {
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
  };

  const renderBody = () => {
    switch (count) {
      case 0:
        return <StepOneContent />;
      case 1:
        return <StepTwoContent />;
      case 2:
        return <StepThreeContent />;
      default:
        return null;
    }
  };

  return (
    <BaseLibraryScreen>
      <View style={tw`flex-1 justify-between mx-4 mt-8`} testID={TEST_ID_PREFIX}>
        {renderBody()}
        <View style={tw`mt-25 mb-3`}>
          <Button
            onPress={() => {
              if (count === 2) {
                setCount(0);
                NavigationService.goBack();
              } else {
                setCount(count + 1);
              }
            }}
            title={count === 2 ? 'Done' : 'Next'}
          />
        </View>
      </View>
    </BaseLibraryScreen>
  );
}
