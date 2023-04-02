import { render } from '@testing-library/react-native';
import * as React from 'react';

import { SignupScreen } from '../SignupScreen';

describe('SignupScreen Screen', () => {
  const testID = 'SignupScreenTestID';

  //TODO::replace with the render with providers after PR : https://bitbucket.org/paladinanalytics/mobile-app/pull-requests/39 get merged
  const getRenderedScreen = () => render(<SignupScreen />);

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
