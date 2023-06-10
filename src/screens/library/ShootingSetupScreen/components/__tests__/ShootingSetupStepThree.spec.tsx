import { render } from '@testing-library/react-native';
import * as React from 'react';

import { ShootingSetupStepThree } from '../ShootingSetupStepThree';

describe('Shooting Setup Step One', () => {
  const getRenderedScreen = () => render(<ShootingSetupStepThree />);

  it(`should render Shooting Setup Step Three correctly`, () => {
    const renderer = getRenderedScreen();
    const renderTree = renderer.toJSON();
    expect(renderTree).toMatchSnapshot();
  });
});
