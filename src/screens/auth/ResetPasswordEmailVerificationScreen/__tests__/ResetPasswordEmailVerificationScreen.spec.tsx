import * as React from 'react';

import { renderWithProviders } from '@sz/test-utils';

import { ResetPasswordEmailVerificationScreen } from '../ResetPasswordEmailVerificationScreen';

describe('Reset Password Email Verification Screen', () => {
  const testID = 'ResetPasswordEmailVerificationScreenContainerTestID';
  const mockRoute = { params: { params: { email: 'test@gmail.com' } } };

  const getRenderedScreen = () => renderWithProviders(<ResetPasswordEmailVerificationScreen route={mockRoute} />);

  it(`should render correctly`, () => {
    const rendered = getRenderedScreen();
    const renderedTree = rendered.toJSON();
    expect(renderedTree).toMatchSnapshot();
  });

  it('should find the screen via testID', () => {
    const { getByTestId } = getRenderedScreen();
    const foundScreen = getByTestId(testID);

    expect(foundScreen).toBeTruthy();
  });
});
