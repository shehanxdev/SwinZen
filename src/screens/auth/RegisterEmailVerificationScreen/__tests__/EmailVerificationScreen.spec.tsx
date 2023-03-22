import { render } from '@testing-library/react-native';
import * as React from 'react';

import { RegisterEmailVerificationScreen } from '../RegisterEmailVerificationScreen';

describe('Register Email Verification Screen', () => {
  const testID = 'RegisterEmailVerificationScreenContainerTestID';
  const getRenderedScreen = () => render(<RegisterEmailVerificationScreen />);

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
