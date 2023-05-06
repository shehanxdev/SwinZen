import React from 'react';
import { View } from 'react-native';

import { tw } from '@sz/config';

import { BaseChartBar } from '../BaseChartBar/BaseChartBar';

interface BaseResultsSectionProps {
  passes: number;
  fails: number;
}

export function BaseResultsSection({ passes, fails }: BaseResultsSectionProps) {
  return (
    <View style={tw`flex flex-row justify-start`}>
      <BaseChartBar barValue={passes} chartBarType={'pass'} />
      <BaseChartBar barValue={fails} chartBarType={'fail'} />
    </View>
  );
}
