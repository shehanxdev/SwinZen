import { render } from '@testing-library/react-native';
import * as React from 'react';

import { ForgotPasswordScreen } from '../ForgotPasswordScreen';

describe('ForgotPasswordScreen Screen', () => {
  const testID = 'ForgotPasswordScreenTestID';

  const getRenderedScreen = () => render(<ForgotPasswordScreen />);
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
