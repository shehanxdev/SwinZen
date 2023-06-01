import React from 'react';

import { ScoreType } from '@sz/constants';

import { BaseMainScreen } from '../components';
import { AnalysisDataCard } from './components';

export function AnalysisScreen() {
  return (
    <BaseMainScreen>
      <AnalysisDataCard score={15} observation={ScoreType.OVERALL} time={new Date()} />
    </BaseMainScreen>
  );
}
