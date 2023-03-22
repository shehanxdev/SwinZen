import { render } from '@testing-library/react-native';
import * as React from 'react';

import { EmailVerificationScreen } from '../EmailVerificationScreen';

describe('EmailVerification Screen', () => {
  const testID = 'EmailVerificationScreenContainerTestID';
  const getRenderedScreen = () => render(<EmailVerificationScreen />);

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
