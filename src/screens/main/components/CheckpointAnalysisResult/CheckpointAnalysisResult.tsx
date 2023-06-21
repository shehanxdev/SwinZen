import React from 'react';
import { Pressable, View } from 'react-native';

import {
  FailCheckpointCrossIcon,
  MoveRightArrowIcon,
  PassCheckpointCrossIcon,
  PassStarCircleIcon,
  Text,
} from '@sz/components';
import { tw } from '@sz/config';
import { TextVariant } from '@sz/constants';

export interface CheckpointAnalysisResultProps {
  overallStatus: 'pass' | 'fail';
  checkPoint: string;
  subCheckpoint: string;
  onPress?: () => void;
}

export function CheckpointAnalysisResult({
  overallStatus,
  checkPoint,
  subCheckpoint,
  onPress,
}: CheckpointAnalysisResultProps) {
  const renderLeftOverallStatusIcon = () =>
    overallStatus === 'pass' ? <PassCheckpointCrossIcon /> : <FailCheckpointCrossIcon />;

  const renderRightActionIcon = () => (overallStatus === 'pass' ? <PassStarCircleIcon /> : <MoveRightArrowIcon />);

  return (
    <Pressable
      testID="CheckpointAnalysisResultTestID"
      style={tw`flex flex-row justify-between items-center h-8.5 w-full`}
      onPress={() => {
        if (overallStatus !== 'pass') {
          onPress();
        }
      }}>
      <View style={tw`flex flex-row items-center h-full`}>
        {renderLeftOverallStatusIcon()}
        <View style={tw`ml-9.25`}>
          <Text variant={TextVariant.Body2SemiBold}>{checkPoint}</Text>
        </View>
      </View>
      <View style={tw`flex flex-row items-center`}>
        {/* Width of this component and horizontal padding are not consistant in design system */}
        <View style={tw`justify-center rounded-2.5 mr-5 bg-Primary-Sz900 h-8.5 px-2.5`}>
          <Text variant={TextVariant.Labels}>{subCheckpoint}</Text>
        </View>
        {renderRightActionIcon()}
      </View>
    </Pressable>
  );
}
