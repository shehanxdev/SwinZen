import { render } from '@testing-library/react-native';
import * as React from 'react';

import { HowToShootStepOne } from '../HowToShootStepOne';

describe('How to shoot step one', () => {
  const getRenderedScreen = () => render(<HowToShootStepOne />);

  it(`Should render How to shoot step one correctly`, () => {
    const renderer = getRenderedScreen();
    const renderTree = renderer.toJSON();
    expect(renderTree).toMatchSnapshot();
  });
});
