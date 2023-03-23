import { render } from '@testing-library/react-native';
import * as React from 'react';

import { GradientBackground, GradientBackgroundProps } from './../GradientBackground';

describe('GradientBackground Component', () => {
  const testID = 'GradientBackgroundTestID';

  const getRenderedGradientBackgroundComponet = (props?: Partial<GradientBackgroundProps>) =>
    render(<GradientBackground {...props} testID={testID} />);

  it(`should render correctly`, () => {
    const rendered = getRenderedGradientBackgroundComponet();
    const renderedTree = rendered.toJSON();
    expect(renderedTree).toMatchSnapshot();
  });

  it('should find the component via testID', () => {
    const { getByTestId } = getRenderedGradientBackgroundComponet();
    const foundOTPInputComponent = getByTestId(testID);

    expect(foundOTPInputComponent).toBeTruthy();
  });
});
