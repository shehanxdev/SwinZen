import { render } from '@testing-library/react-native';
import * as React from 'react';

import { GolfTipsScreen } from '../GolfTipsScreen';

describe('Library Screen Screen', () => {
  const testID = 'GolfTipsScreenTestID';

  const getRenderedScreen = () => render(<GolfTipsScreen />);

  it(`should render Library Screen correctly`, () => {
    const renderer = getRenderedScreen();
    const renderTree = renderer.toJSON();
    expect(renderTree).toMatchSnapshot();
  });

  it('should find the Golf tips Screen via testID', () => {
    const { getByTestId } = getRenderedScreen();
    const foundScreen = getByTestId(testID);
    expect(foundScreen).toBeTruthy();
  });
});
