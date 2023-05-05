import React from 'react';
import { View } from 'react-native';

import { tw } from '@sz/config';

import { ChartBar } from '../BaseChartBar/BaseChartBar';

interface BaseResultsSectionProps {
  passes: number;
  fails: number;
}

export function BaseResultsSection({ passes, fails }: BaseResultsSectionProps) {
  return (
    <View style={tw`flex flex-row justify-start`}>
      <ChartBar barValue={passes} chartBarType={'pass'} />
      <ChartBar barValue={fails} chartBarType={'fail'} />
    </View>
  );
}
