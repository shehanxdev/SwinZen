import * as React from 'react';

import { renderWithProviders } from '@sz/test-utils';

import { SignupScreen } from '../SignupScreen';

describe('Signup Screen', () => {
  const testID = 'SignupScreenTestID';
  const getRenderedScreen = () => renderWithProviders(<SignupScreen />);

  it(`should render SignupScreen correctly`, () => {
    const renderer = getRenderedScreen();
    const renderTree = renderer.toJSON();
    expect(renderTree).toMatchSnapshot();
  });

  it('should find the SignupScreen via testID', () => {
    const { getByTestId } = getRenderedScreen();
    const foundScreen = getByTestId(testID);
    expect(foundScreen).toBeTruthy();
  });
});
