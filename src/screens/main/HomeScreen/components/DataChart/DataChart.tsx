import React, { useMemo } from 'react';
import { View } from 'react-native';

import { tw } from '@sz/config';

import { BaseResultSectionDivider } from './components/BaseResultSectionDivider';
import { BaseResultsSection } from './components/BaseResultsSection';

interface BarSectionData {
  passes: number;
  fails: number;
}

interface DataChartProps {
  sectionOne: BarSectionData; // aggregates the total data of passes and fails for "Set Up", "Back Swing", and "Down Swing" for that month.
  sectionTwo: BarSectionData; // aggregates the total data of passes and fails for "Set Up "for that month.
  sectionThree: BarSectionData; // aggregates the total data of passes and fails for "Back Swing" for that month.
  sectionFour: BarSectionData; // aggregates the total data of passes and fails for "Down Swing" for that month.
}

export function DataChart({ sectionOne, sectionTwo, sectionThree, sectionFour }: DataChartProps) {
  const renderChartData = useMemo(() => {
    const combinedChartData = [sectionOne, sectionTwo, sectionThree, sectionFour];

    return combinedChartData.map((data, index) => (
      <React.Fragment key={index}>
        <BaseResultsSection passes={data.passes} fails={data.fails} />
        {index !== 3 && <BaseResultSectionDivider />}
      </React.Fragment>
    ));
  }, [sectionOne, sectionTwo, sectionThree, sectionFour]);
  return (
    <View style={tw`flex flex-row h-58.75 justify-between`} testID="DataChartTestID">
      {renderChartData}
    </View>
  );
}
