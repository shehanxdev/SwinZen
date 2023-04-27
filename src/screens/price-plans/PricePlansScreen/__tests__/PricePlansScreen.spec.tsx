import * as React from 'react';

import { renderWithProviders } from '@sz/utils';

import { PricePlansScreen } from '../PricePlansScreen';

describe('PricePlans Screen', () => {
  const testID = 'PricePlansScreenTestID';
  const getRenderedScreen = () => renderWithProviders(<PricePlansScreen />);

  it(`should render PricePlans Screen correctly`, () => {
    const renderer = getRenderedScreen();
    const renderTree = renderer.toJSON();
    expect(renderTree).toMatchSnapshot();
  });

  it('should find the PricePlans Screen via testID', () => {
    const { getByTestId } = getRenderedScreen();
    const foundScreen = getByTestId(testID);
    expect(foundScreen).toBeTruthy();
  });
});