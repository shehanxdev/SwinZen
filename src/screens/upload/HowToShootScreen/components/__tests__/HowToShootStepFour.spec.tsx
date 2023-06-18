import { render } from '@testing-library/react-native';
import * as React from 'react';

import { HowToShootStepFour } from '../HowToShootStepFour';

describe('How to shoot step four', () => {
  const getRenderedScreen = () => render(<HowToShootStepFour />);

  it(`Should render How to shoot step four correctly`, () => {
    const renderer = getRenderedScreen();
    const renderTree = renderer.toJSON();
    expect(renderTree).toMatchSnapshot();
  });
});
