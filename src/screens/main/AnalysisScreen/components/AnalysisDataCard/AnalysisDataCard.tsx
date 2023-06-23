import React from 'react';
import { Pressable, View } from 'react-native';

import { Text } from '@sz/components';
import { szdayjs, tw } from '@sz/config';
import { Checkpoint, Color, Route, SubCheckpoint, TextVariant, VideoType } from '@sz/constants';
import { NavigationService } from '@sz/services';
import { addPadToNumber } from '@sz/utils';

export interface AnalysisDataCardProps {
  testID?: string;
  score: number;
  observation: Checkpoint;
  time: Date;
}

export function AnalysisDataCard({
  testID = 'AnalysisDataCardTestID',
  score,
  observation,
  time,
}: AnalysisDataCardProps) {
  const currentMonth = szdayjs().get('month');
  const actualMonth = szdayjs(new Date(time)).get('month');

  return (
    <Pressable
      testID={testID}
      style={tw`flex-row h-16 mx-2 my-1.75 px-5 bg-Neutral-Sz1000 rounded-2.5 items-center justify-between`}
      onPress={() => {
        if (observation !== Checkpoint.OVERALL) {
          // TODO:: Add this navigation into relavant swing analysis data screen
          NavigationService.navigate(Route.ProTips, {
            checkpoint: observation,
            videoType: VideoType.DOWNTHELINE,
            subCheckpoint: SubCheckpoint.BACK_KNEE_ANGLE,
          });
        }
      }}>
      <View style={tw`flex-row items-center gap-7.5`}>
        {/* design shadow and this implemntation has a different, here can't use arbitary values to shadow, added closest tailwind style */}
        <View
          style={tw`w-10 h-10 bg-[${
            score < 5 ? Color.Secondary.Sz900 : Color.Primary.Sz500
          }] items-center justify-center rounded-full shadow-md shadow-Neutral-Black/25`}>
          <Text variant={TextVariant.SubTitle2SemiBold} color={Color.Primary.Sz100}>
            {addPadToNumber(score)}
          </Text>
        </View>
        <Text variant={TextVariant.Body2SemiBold} color={Color.Neutral.White}>
          {observation}
        </Text>
      </View>
      <View style={tw`flex-row pl-7.5 items-center gap-2.5 border-l-2 border-Neutral-Sz100`}>
        <Text variant={TextVariant.Body2Regular} color={Color.Primary.Sz200}>
          {currentMonth === actualMonth + 1 ? 'last month' : szdayjs(time).format('MMMM')}
        </Text>
        <Text variant={TextVariant.SubTitle1} color={Color.Neutral.White}>
          {addPadToNumber(szdayjs(time).date())}
        </Text>
      </View>
    </Pressable>
  );
}