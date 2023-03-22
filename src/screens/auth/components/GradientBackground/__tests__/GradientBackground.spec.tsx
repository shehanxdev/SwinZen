import { render } from '@testing-library/react-native';
import * as React from 'react';

import { GradientBackgroundProps } from '../GradientBackground.types';
import { GradientBackground } from './../GradientBackground';

describe('GradientBackground Component', () => {
  const testID = 'GradientBackgroundTestID';

  const getRenderedComponent = (props?: Partial<GradientBackgroundProps>) =>
    render(<GradientBackground testID={testID} {...props} />);

  it(`should render GradientBackground correctly`, () => {
    const renderer = getRenderedComponent();
    const renderTree = renderer.toJSON();
    expect(renderTree).toMatchSnapshot();
  });

  it('should find the GradientBackground via testID', () => {
    const { getByTestId } = getRenderedComponent();
    const foundComponent = getByTestId(testID);
    expect(foundComponent).toBeTruthy();
  });
});
