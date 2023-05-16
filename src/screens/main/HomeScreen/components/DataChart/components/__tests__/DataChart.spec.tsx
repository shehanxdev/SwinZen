import { render } from '@testing-library/react-native';
import * as React from 'react';

import { DataChart } from './../../DataChart';

describe('DataChart component', () => {
  const testID = 'DataChartTestID';

  const initialSectionsData = [
    { passes: 10, fails: 5, label: 'Overall' },
    { passes: 4, fails: 2, label: 'Setup' },
    { passes: 9, fails: 5, label: 'Backswing' },
    { passes: 1, fails: 6, label: 'Downswing' },
  ] as any;

  const getRenderedComponent = () => render(<DataChart sections={initialSectionsData} />);

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
