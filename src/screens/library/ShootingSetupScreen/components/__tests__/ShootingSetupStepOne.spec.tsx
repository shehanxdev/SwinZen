import { render } from '@testing-library/react-native';
import * as React from 'react';

import { ShootingSetupStepOne } from '../ShootingSetupStepOne';

describe('Shooting Setup Step One', () => {
  const getRenderedScreen = () => render(<ShootingSetupStepOne />);

  it(`should render Shooting Setup Step one correctly`, () => {
    const renderer = getRenderedScreen();
    const renderTree = renderer.toJSON();
    expect(renderTree).toMatchSnapshot();
  });
});
