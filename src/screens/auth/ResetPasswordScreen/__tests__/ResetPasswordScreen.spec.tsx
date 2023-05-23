import * as React from 'react';

import { renderWithProviders } from '@sz/utils';

import { ResetPasswordScreen } from '../ResetPasswordScreen';

describe('ResetPasswordScreen Screen', () => {
  const testID = 'ResetPasswordScreenTestID';

  const getRenderedScreen = () => renderWithProviders(<ResetPasswordScreen />);

  it(`should render ResetPasswordScreen correctly`, () => {
    const renderer = getRenderedScreen();
    const renderTree = renderer.toJSON();
    expect(renderTree).toMatchSnapshot();
  });

  it('should find the ResetPasswordScreen via testID', () => {
    const { getByTestId } = getRenderedScreen();
    const foundScreen = getByTestId(testID);
    expect(foundScreen).toBeTruthy();
  });
});
