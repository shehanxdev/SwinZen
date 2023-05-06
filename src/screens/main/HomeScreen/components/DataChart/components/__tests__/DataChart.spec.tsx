import { render } from '@testing-library/react-native';
import * as React from 'react';

import { DataChart } from './../../DataChart';

describe('DataChart component', () => {
  const testID = 'DataChartTestID';
  const initialChartData = {
    sectionOne: { passes: 8, fails: 5 },
    sectionTwo: { passes: 10, fails: 6 },
    sectionThree: { passes: 4, fails: 2 },
    sectionFour: { passes: 2, fails: 8 },
  };

  const getRenderedComponent = () => render(<DataChart {...initialChartData} />);

  it(`should render DataChart component correctly`, () => {
    const renderer = getRenderedComponent();
    const renderTree = renderer.toJSON();
    expect(renderTree).toMatchSnapshot();
  });

  it('should find the DataChart component via testID', () => {
    const { getByTestId } = getRenderedComponent();
    const foundScreen = getByTestId(testID);
    expect(foundScreen).toBeTruthy();
  });
});
