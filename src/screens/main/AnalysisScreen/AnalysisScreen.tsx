import React from 'react';
import { View } from 'react-native';

import { Button } from '@sz/components';
import { tw } from '@sz/config';
import { Color, Route, ScoreType } from '@sz/constants';
import { NavigationService } from '@sz/services';

import { BaseMainScreen, MonthSelector } from '../components';
import { AnalysisDataCard } from './components';

export function AnalysisScreen() {
  const timeData = new Date('2023-05-01');
  return (
    <BaseMainScreen testID="AnalysisScreenTestID">
      <View style={tw`flex-1 justify-between`}>
        <View style={tw`mt-13 pb-3.25 rounded-2.5 bg-Transparency-dark`}>
          <View style={tw`pt-1 pb-5`}>
            <MonthSelector textColor={Color.Neutral.Sz200} />
          </View>
          <AnalysisDataCard score={15} observation={ScoreType.OVERALL} time={timeData} />
          <AnalysisDataCard score={8} observation={ScoreType.SETUP} time={timeData} />
          <AnalysisDataCard score={3} observation={ScoreType.BACKSWING} time={timeData} />
          <AnalysisDataCard score={12} observation={ScoreType.DOWNSWING} time={timeData} />
        </View>
      </View>
      <View style={tw`mb-6 mx-4`}>
        <Button onPress={() => NavigationService.navigate(Route.VideosTab)} title={'view all my videos'} />
      </View>
    </BaseMainScreen>
  );
}
