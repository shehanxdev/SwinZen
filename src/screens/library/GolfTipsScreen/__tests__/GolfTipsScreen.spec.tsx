import * as React from 'react';

import { renderWithProviders } from '@sz/test-utils';

import { GolfTipsScreen } from '../GolfTipsScreen';

describe('Golf tips Screen', () => {
  const testID = 'GolfTipsScreenTestID';

  const getRenderedScreen = () => renderWithProviders(<GolfTipsScreen />);

  it(`should render Golf tips Screen correctly`, () => {
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
