import { render } from '@testing-library/react-native';
import * as React from 'react';

import { ProfileImageBanner } from '../ProfileImageBanner';

describe('ProfileImageBanner component', () => {
  const testID = 'ProfileImageBannerComponentTestID';

  const getRenderedComponent = () => render(<ProfileImageBanner />);

  it(`should render ProfileImageBanner component correctly`, () => {
    const renderer = getRenderedComponent();
    const renderTree = renderer.toJSON();
    expect(renderTree).toMatchSnapshot();
  });

  it('should find the ProfileImageBanner component via testID', () => {
    const { getByTestId } = getRenderedComponent();
    const foundScreen = getByTestId(testID);
    expect(foundScreen).toBeTruthy();
  });
});
