import { render } from '@testing-library/react-native';
import * as React from 'react';

import { DataChart } from './../../DataChart';

describe('DataChart component', () => {
  const testID = 'DataChartTestID';
  const initialChartData = {
    overall: { passes: 8, fails: 5, label: 'overall' },
    setup: { passes: 10, fails: 6, label: 'setup' },
    backswing: { passes: 4, fails: 2, label: 'backswing' },
    downswing: { passes: 2, fails: 8, label: 'downswing' },
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
