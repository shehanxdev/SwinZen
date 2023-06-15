import { render } from '@testing-library/react-native';
import * as React from 'react';

import { ShootingSetupStepTwo } from '../ShootingSetupStepTwo';

describe('Shooting Setup Step Two', () => {
  const getRenderedScreen = () => render(<ShootingSetupStepTwo />);

  it(`should render Shooting Setup Step Two correctly`, () => {
    const renderer = getRenderedScreen();
    const renderTree = renderer.toJSON();
    expect(renderTree).toMatchSnapshot();
  });
});
