import { render } from '@testing-library/react-native';
import * as React from 'react';

import { ShootingSetupScreen } from '../ShootingSetupScreen';

describe('Shooting Setup Screen', () => {
  const testID = 'ShootingSetupScreenTestID';

  const getRenderedScreen = () => render(<ShootingSetupScreen />);

  it(`should render Shooting Setup Screen correctly`, () => {
    const renderer = getRenderedScreen();
    const renderTree = renderer.toJSON();
    expect(renderTree).toMatchSnapshot();
  });

  it('should find the Shooting Setup Screen via testID', () => {
    const { getByTestId } = getRenderedScreen();
    const foundScreen = getByTestId(testID);
    expect(foundScreen).toBeTruthy();
  });
});
