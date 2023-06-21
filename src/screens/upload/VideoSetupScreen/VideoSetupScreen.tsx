import React, { useState } from 'react';
import { View } from 'react-native';

import { Button, Text, ToggleSwitch } from '@sz/components';
import { tw } from '@sz/config';
import {
  ClubTypeOptions,
  Color,
  InitialSetupValues,
  Route,
  TextAlignment,
  TextVariant,
  ToggleSwitchData,
  VideoSetupSwitchType,
} from '@sz/constants';
import { VideoSetupValuesType } from '@sz/models';
import { NavigationService } from '@sz/services';
import { useSelector } from '@sz/stores';

import { BaseUploadScreen, SelectableGrid } from '../components';

export function VideoSetupScreen() {
  const [setupValues, setSetupValues] = useState<VideoSetupValuesType>(InitialSetupValues);

  const skippedInstructions = useSelector(state => state.persistentUserStore.skippedInstructions);

  //TODO:: to be replaced with proper value select handlers
  const getSelectedValue = (key: VideoSetupSwitchType, value: string) => {
    setSetupValues(prevValues => {
      return {
        ...prevValues,
        [key]: value,
      };
    });
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
          {ToggleSwitchData.map(data => {
            return (
              <View style={tw`mb-9.25`} key={data.key}>
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
              Club type
            </Text>
          </View>
          <SelectableGrid
            options={ClubTypeOptions}
            onChange={value => getSelectedValue(VideoSetupSwitchType.CLUB_TYPE, value)}
            testID="SelectableGridTestID"
          />
        </View>
        <View style={tw`mb-4 mt-9.25`}>
          <Button
            backgroundColor={Color.Primary.Sz650}
            textColor={Color.Neutral.Sz100}
            title="NEXT"
            onPress={
              skippedInstructions
                ? () => NavigationService.navigate(Route.PreValidation)
                : () => NavigationService.navigate(Route.HowToShoot, { setupValues })
            }
          />
        </View>
      </View>
    </BaseUploadScreen>
  );
}
