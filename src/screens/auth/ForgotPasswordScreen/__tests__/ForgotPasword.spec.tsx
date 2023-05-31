import * as React from 'react';

import { renderWithProviders } from '@sz/test-utils';

import { ForgotPasswordScreen } from '../ForgotPasswordScreen';

describe('ForgotPasswordScreen Screen', () => {
  const testID = 'ForgotPasswordScreenTestID';

  const getRenderedScreen = () => renderWithProviders(<ForgotPasswordScreen />);
  it(`should render ForgotPasswordScreen correctly`, () => {
    const renderer = getRenderedScreen();
    const renderTree = renderer.toJSON();
    expect(renderTree).toMatchSnapshot();
  });

  it('should find the ForgotPasswordScreen via testID', () => {
    const { getByTestId } = getRenderedScreen();
    const foundScreen = getByTestId(testID);
    expect(foundScreen).toBeTruthy();
  });
});
