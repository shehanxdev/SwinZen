import { render } from '@testing-library/react-native';
import * as React from 'react';

import { HowToShootStepThree } from '../HowToShootStepThree';

describe('How to shoot step three', () => {
  const getRenderedScreen = () => render(<HowToShootStepThree />);

  it(`Should render How to shoot step three correctly`, () => {
    const renderer = getRenderedScreen();
    const renderTree = renderer.toJSON();
    expect(renderTree).toMatchSnapshot();
  });
});
