import { render } from '@testing-library/react-native';
import * as React from 'react';

import { HowToShootStepTwo } from '../HowToShootStepTwo';

describe('How to shoot step two', () => {
  const getRenderedScreen = () => render(<HowToShootStepTwo />);

  it(`Should render How to shoot step two correctly`, () => {
    const renderer = getRenderedScreen();
    const renderTree = renderer.toJSON();
    expect(renderTree).toMatchSnapshot();
  });
});
