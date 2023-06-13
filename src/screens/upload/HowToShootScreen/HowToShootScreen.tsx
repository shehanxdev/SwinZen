import React, { useEffect, useMemo, useState } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';

import { Button, Link } from '@sz/components';
import { tw } from '@sz/config';
import { Route, SetupValuesType } from '@sz/constants';
import { useHeaderHeight } from '@sz/hooks';
import { VideoSetupValuesType } from '@sz/models';
import { NavigationService } from '@sz/services';
import { useDispatch, useSelector } from '@sz/stores';

import { InstructionsSkipModal } from '../components';
import { HowToShootStepFour, HowToShootStepOne, HowToShootStepThree, HowToShootStepTwo } from './components';

const TEST_ID_PREFIX = 'HowToShootScreenTestID';

export function HowToShootScreen({ route }) {
  const data = route.params.params?.setupValues as VideoSetupValuesType;
  const headerHeight = useHeaderHeight();

  const [count, setCount] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();

  const setSkippedInstructions = dispatch.persistentUserStore.setSkippedInstructions;
  const skippedInstructions = useSelector(state => state.persistentUserStore.skippedInstructions);

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
    return () => setCount(0);
  }, []);

  const onSkipPress = () => {
    setCount(0);
    setShowModal(false);
    setSkippedInstructions(true);
    setTimeout(() => NavigationService.navigate(Route.PreValidation), 200);
  };

  const renderBody = useMemo(() => {
    switch (count) {
      case 0:
        return <HowToShootStepOne />;
      case 1:
        return <HowToShootStepTwo />;
      case 2:
        return <HowToShootStepThree />;
      case 3:
        return <HowToShootStepFour />;
      default:
        return null;
    }
  }, [count]);

  return (
    <SafeAreaView style={tw`h-full pt-[${headerHeight}px] bg-Neutral-Sz900`}>
      <ScrollView contentContainerStyle={tw`grow`}>
        <View testID={TEST_ID_PREFIX} style={tw`flex-1 justify-between mx-4 mt-8`}>
          {renderBody}
          <View style={tw`mt-25 mb-3`}>
            <Button
              onPress={() => {
                if (count === 3 && !data) {
                  NavigationService.goBack();
                } else if (data) {
                  setCount(0);
                  NavigationService.goBack();
                  setTimeout(() => NavigationService.navigate(Route.PreValidation), 500);
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
          <InstructionsSkipModal
            showModal={showModal}
            handleModalClose={() => setShowModal(false)}
            onSkipped={onSkipPress}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
