import { render } from '@testing-library/react-native';
import * as React from 'react';

import { AnalysisScreen } from '../AnalysisScreen';

describe('Analysis Screen Screen', () => {
  const testID = 'AnalysisScreenTestID';

  const getRenderedScreen = () => render(<AnalysisScreen />);

  it(`should render Analysis Screen correctly`, () => {
    const renderer = getRenderedScreen();
    const renderTree = renderer.toJSON();
    expect(renderTree).toMatchSnapshot();
  });

  it('should find the Analysis Screen via testID', () => {
    const { getByTestId } = getRenderedScreen();
    const foundScreen = getByTestId(testID);
    expect(foundScreen).toBeTruthy();
  });
});
