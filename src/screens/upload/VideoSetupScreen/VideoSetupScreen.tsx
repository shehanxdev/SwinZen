import React, { useState } from 'react';
import { View } from 'react-native';

import { Button, Text, ToggleSwitch } from '@sz/components';
import { tw } from '@sz/config';
import {
  ClubTypeOptions,
  Color,
  InitialSetupValues,
  SetupValuesType,
  TextAlignment,
  TextVariant,
  ToggleSwitchData,
  VideoSetupSwitchType,
} from '@sz/constants';
import { VideoSetupValuesType } from '@sz/models';

import { BaseUploadScreen, SelectableGrid } from '../components';

export function VideoSetupScreen() {
  const [setupValues, setSetupValues] = useState<VideoSetupValuesType>(InitialSetupValues);

  //TODO:: to be replaced with proper value select handlers
  const getSelectedValue = (key: VideoSetupSwitchType, value: string) => {
    setSetupValues(prevValues => {
      return {
        ...prevValues,
        [key]: value,
      };
    });
  };

  const handleNavigationToInstructionScreens = () => {
    if (
      setupValues.videoView === SetupValuesType.DOWN_THE_LINE &&
      setupValues.shootingMethod === SetupValuesType.TRIPOD
    ) {
      //TODO:: navigate to Down The Line/Tripod Instructions screen
    } else if (
      setupValues.videoView === SetupValuesType.DOWN_THE_LINE &&
      setupValues.shootingMethod === SetupValuesType.HAND_HELD
    ) {
      //TODO:: navigate to Down The Line/Hand-Held Instructions screen
    } else if (
      setupValues.videoView === SetupValuesType.FACE_ON &&
      setupValues.shootingMethod === SetupValuesType.TRIPOD
    ) {
      //TODO:: navigate to Face-On/Tripod Instructions screen
    } else {
      //TODO:: navigate to Face-On/Hand-Held Instructions screen
    }
  };

  return (
    <BaseUploadScreen isSetupScreen testID="VideoSetupScreenTestID">
      <View style={tw`mx-4 flex-1 justify-between`}>
        <View>
          <View style={tw`pt-8.5 mb-6.25`}>
            <Text variant={TextVariant.SubTitle2SemiBold} color={Color.Neutral.Sz100}>
              Video setup
            </Text>
          </View>
          {ToggleSwitchData.map((data, index) => {
            return (
              <View style={tw`mb-9.25`} key={index}>
                <View style={tw`mb-2.25`}>
                  <Text variant={TextVariant.Body2Regular} color={Color.Neutral.White} textAlign={TextAlignment.Left}>
                    {data.label}
                  </Text>
                </View>
                <ToggleSwitch options={data.options} onChange={value => getSelectedValue(data.key, value)} />
              </View>
            );
          })}
          <View style={tw`mb-2.25`}>
            <Text variant={TextVariant.Body2Regular} color={Color.Neutral.White} textAlign={TextAlignment.Left}>
              Shooting method
            </Text>
          </View>
          <SelectableGrid
            options={ClubTypeOptions}
            onChange={value => getSelectedValue(VideoSetupSwitchType.CLUB_TYPE, value)}
            testID="SelectableGridTestID"
          />
        </View>
        <View style={tw`mb-5 mt-32.25`}>
          {/* TODO:: handle the navigation once the instruction pages are ready */}
          <Button
            backgroundColor={Color.Primary.Sz650}
            textColor={Color.Neutral.Sz100}
            title="NEXT"
            onPress={handleNavigationToInstructionScreens}
          />
        </View>
      </View>
    </BaseUploadScreen>
  );
}
