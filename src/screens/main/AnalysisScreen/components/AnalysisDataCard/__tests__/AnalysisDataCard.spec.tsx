import { render } from '@testing-library/react-native';
import * as React from 'react';

import { ScoreType } from '@sz/constants';

import { AnalysisDataCard } from './../AnalysisDataCard';

describe('AnalysisData Card Component', () => {
  const testID = 'AnalysisDataCardTestID';
  const mockScore = 10;
  const mockObservation = ScoreType.OVERALL;
  const mockDate = new Date();

  const getRenderedComponent = () =>
    render(<AnalysisDataCard testID={testID} score={mockScore} observation={mockObservation} time={mockDate} />);

  beforeEach(() => {
    jest.useFakeTimers().setSystemTime(new Date('2023-05-30'));
  });

  it(`should render AnalysisData Card component correctly`, () => {
    const rendered = getRenderedComponent();
    const renderedTree = rendered.toJSON();
    expect(renderedTree).toMatchSnapshot();
  });

  it('should find the AnalysisData Card component via testID', () => {
    const { getByTestId } = getRenderedComponent();
    const foundAnalysisDataCardComponent = getByTestId(testID);
    expect(foundAnalysisDataCardComponent).toBeTruthy();
  });
});
