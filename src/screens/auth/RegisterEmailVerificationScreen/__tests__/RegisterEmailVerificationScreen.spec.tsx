import * as React from 'react';

import { renderWithProviders } from '@sz/utils';

import { RegisterEmailVerificationScreen } from '../RegisterEmailVerificationScreen';

describe('Register Email Verification Screen', () => {
  const testID = 'RegisterEmailVerificationScreenContainerTestID';
  const mockRoute = { params: { params: 'test@gmail.com' } };

  const getRenderedScreen = () => renderWithProviders(<RegisterEmailVerificationScreen route={mockRoute} />);

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
