import * as React from 'react';

import { renderWithProviders } from '@sz/utils';

import { ResetPasswordScreen } from '../ResetPasswordScreen';

describe('ResetPasswordScreen Screen', () => {
  const testID = 'ResetPasswordScreenTestID';
  const mockRoute = { params: { params: { email: 'test@gmail.com' } } };

  const getRenderedScreen = () => renderWithProviders(<ResetPasswordScreen route={mockRoute} />);
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
