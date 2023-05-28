import * as React from 'react';

import { renderWithProviders } from '@sz/test-utils';

import { ChangePasswordScreen } from '../ChangePasswordScreen';

describe('ChangePasswordScreen Screen', () => {
  const testID = 'ChangePasswordScreenTestID';

  const getRenderedScreen = () => renderWithProviders(<ChangePasswordScreen />);

  it(`should render ChangePasswordScreen correctly`, () => {
    const renderer = getRenderedScreen();
    const renderTree = renderer.toJSON();
    expect(renderTree).toMatchSnapshot();
  });

  it('should find the ChangePasswordScreen via testID', () => {
    const { getByTestId } = getRenderedScreen();
    const foundScreen = getByTestId(testID);
    expect(foundScreen).toBeTruthy();
  });
});
