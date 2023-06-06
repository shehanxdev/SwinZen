import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';

import { Button, CrossIcon, Link, Text } from '@sz/components';
import { tw } from '@sz/config';
import { Color, Route, SetupValuesType, TextAlignment, TextVariant } from '@sz/constants';
import { VideoSetupValuesType } from '@sz/models';
import { NavigationService } from '@sz/services';
import { useDispatch, useSelector } from '@sz/stores';

import { BaseUploadScreen, InstructionsSkipModal } from '../components';

const TEST_ID_PREFIX = 'HowToShootScreenTestID';

export function HowToShootScreen({ route }) {
  const data = route.params.params?.setupValues as VideoSetupValuesType;

  const [count, setCount] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const setSkippedInstructions = dispatch.persistentUserStore.setSkippedInstructions;
  const skippedInstructions = useSelector(state => state.persistentUserStore.skippedInstructions);

  const renderHeader = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          setCount(0);
          NavigationService.goBack();
        }}
        style={tw`py-2.5 pr-2.5`}>
        <CrossIcon />
      </TouchableOpacity>
    );
  };

  // custom action for navigation header back button
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: renderHeader,
    });
  });

  useEffect(() => {
    if (data) {
      if (data.videoView === SetupValuesType.DOWN_THE_LINE) {
        if (data.shootingMethod === SetupValuesType.HAND_HELD) {
          setCount(1);
        }
      } else if (data.videoView === SetupValuesType.FACE_ON) {
        if (data.shootingMethod === SetupValuesType.TRIPOD) {
          setCount(2);
        } else {
          setCount(3);
        }
      }
    }
  }, []);

  const onSkipPress = () => {
    setCount(0);
    setShowModal(false);
    setSkippedInstructions(true);
    setTimeout(() => NavigationService.navigate(Route.PreValidation), 200);
  };

  const StepOneContent = useCallback(() => {
    return (
      <View>
        <Text color={Color.Primary.Sz200} variant={TextVariant.Body1SemiBold} textAlign={TextAlignment.Auto}>
          {`Down The Line/Tripod Instructions\n`}
        </Text>
        <Text color={Color.Neutral.White} variant={TextVariant.Body1Regular} textAlign={TextAlignment.Auto}>
          {`Take 4 paces/12 ft behind the ball pointing towards the target.\n`}
        </Text>
        <Text color={Color.Neutral.White} variant={TextVariant.Body1Regular} textAlign={TextAlignment.Auto}>
          {`Set your tripod 4-5 feet high.\n`}
        </Text>
        <Text color={Color.Neutral.White} variant={TextVariant.Body1Regular} textAlign={TextAlignment.Auto}>
          {`Position your phone in portrait mode.\n`}
        </Text>
      </View>
    );
  }, []);

  const StepTwoContent = useCallback(() => {
    return (
      <View>
        <Text color={Color.Primary.Sz200} variant={TextVariant.Body1SemiBold} textAlign={TextAlignment.Auto}>
          {`Down The Line/Hand-Held Instructions\n`}
        </Text>
        <Text color={Color.Neutral.White} variant={TextVariant.Body1Regular} textAlign={TextAlignment.Auto}>
          {`Have your buddy take 4 paces/12 ft behind the ball pointing towards the target.\n`}
        </Text>
        <Text color={Color.Neutral.White} variant={TextVariant.Body1Regular} textAlign={TextAlignment.Auto}>
          {`Have your buddy hold the phone in portrait mode.\n`}
        </Text>
      </View>
    );
  }, []);

  const StepThreeContent = useCallback(() => {
    return (
      <View>
        <Text color={Color.Primary.Sz200} variant={TextVariant.Body1SemiBold} textAlign={TextAlignment.Auto}>
          {`Face-On/Tripod Instructions\n`}
        </Text>
        <Text color={Color.Neutral.White} variant={TextVariant.Body1Regular} textAlign={TextAlignment.Auto}>
          {`Take 3 paces/9 ft from the ball, directly in front of the golfer.\n`}
        </Text>
        <Text color={Color.Neutral.White} variant={TextVariant.Body1Regular} textAlign={TextAlignment.Auto}>
          {`Set your tripod 4-5 feet high.\n`}
        </Text>
        <Text color={Color.Neutral.White} variant={TextVariant.Body1Regular} textAlign={TextAlignment.Auto}>
          {`Position your phone in landscape mode.\n`}
        </Text>
      </View>
    );
  }, []);

  const StepFourContent = useCallback(() => {
    return (
      <View>
        <Text color={Color.Primary.Sz200} variant={TextVariant.Body1SemiBold} textAlign={TextAlignment.Auto}>
          {`Face-On/Hand-Held Instructions\n`}
        </Text>
        <Text color={Color.Neutral.White} variant={TextVariant.Body1Regular} textAlign={TextAlignment.Auto}>
          {`Have your buddy take 3 paces/9 ft from the ball, directly in front of the golfer. \n`}
        </Text>
        <Text color={Color.Neutral.White} variant={TextVariant.Body1Regular} textAlign={TextAlignment.Auto}>
          {`Have your buddy take 3 paces/9 ft from the ball, directly in front of the golfer. \n`}
        </Text>
      </View>
    );
  }, []);

  const renderBody = useMemo(() => {
    switch (count) {
      case 0:
        return <StepOneContent />;
      case 1:
        return <StepTwoContent />;
      case 2:
        return <StepThreeContent />;
      case 3:
        return <StepFourContent />;
      default:
        return null;
    }
  }, [count]);

  return (
    <BaseUploadScreen testID={TEST_ID_PREFIX}>
      <View style={tw`flex-1 justify-between mx-4 mt-8`}>
        {renderBody}
        <View style={tw`mt-25 mb-3`}>
          <Button
            onPress={() => {
              if (count === 3 && !data) {
                NavigationService.goBack();
              } else if (data) {
                setCount(0);
                NavigationService.navigate(Route.PreValidation);
              } else {
                setCount(count + 1);
              }
            }}
            title="Next"
          />
          {!skippedInstructions && data && (
            <View style={tw`my-6`}>
              <Link text="Always skip instructions" onPress={() => setShowModal(true)} />
            </View>
          )}
        </View>
      </View>
      <InstructionsSkipModal
        showModal={showModal}
        handleModalClose={() => setShowModal(false)}
        onSkipped={onSkipPress}
      />
    </BaseUploadScreen>
  );
}
