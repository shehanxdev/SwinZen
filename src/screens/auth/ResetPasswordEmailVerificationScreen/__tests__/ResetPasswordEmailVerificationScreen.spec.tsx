import { render } from '@testing-library/react-native';
import * as React from 'react';

import { ResetPasswordEmailVerificationScreen } from '../ResetPasswordEmailVerificationScreen';

describe('Reset Password Email Verification Screen', () => {
  const testID = 'ResetPasswordEmailVerificationScreenContainerTestID';
  const getRenderedScreen = () => render(<ResetPasswordEmailVerificationScreen />);

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
