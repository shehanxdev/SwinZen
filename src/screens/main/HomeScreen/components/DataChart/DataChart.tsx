import React, { useMemo } from 'react';
import { View } from 'react-native';

import { tw } from '@sz/config';

import { BaseResultSectionDivider } from './components/BaseResultSectionDivider';
import { BaseResultsSection } from './components/BaseResultsSection';

interface BarSectionData {
  passes: number;
  fails: number;
  label: string;
}

interface DataChartProps {
  overall: BarSectionData; // aggregates the total data of passes and fails for "Set Up", "Back Swing", and "Down Swing" for that month.
  setup: BarSectionData; // aggregates the total data of passes and fails for "Set Up "for that month.
  backswing: BarSectionData; // aggregates the total data of passes and fails for "Back Swing" for that month.
  downswing: BarSectionData; // aggregates the total data of passes and fails for "Down Swing" for that month.
}

export function DataChart({ overall, setup, backswing, downswing }: DataChartProps) {
  const renderChartData = useMemo(() => {
    const combinedChartData = [overall, setup, backswing, downswing];

    return combinedChartData.map((data, index) => (
      // TODO::might have to redirect to analysis screen upon clicking on these sections depending on the requirements
      <React.Fragment key={index}>
        <BaseResultsSection passes={data.passes} fails={data.fails} label={data.label} />
        {index !== 3 && <BaseResultSectionDivider />}
      </React.Fragment>
    ));
  }, [overall, setup, backswing, downswing]);
  return (
    <View style={tw`flex flex-row h-58.75 justify-between`} testID="DataChartTestID">
      {renderChartData}
    </View>
  );
}
