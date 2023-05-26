import React, { useMemo } from 'react';
import { View } from 'react-native';

import { tw } from '@sz/config';
import { DataChartProps } from '@sz/models';

import { BaseResultSectionDivider } from './components/BaseResultSectionDivider';
import { BaseResultsSection } from './components/BaseResultsSection';

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
