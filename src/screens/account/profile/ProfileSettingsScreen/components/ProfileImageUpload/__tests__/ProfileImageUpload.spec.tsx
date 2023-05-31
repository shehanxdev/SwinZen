import * as React from 'react';

import { renderWithProviders } from '@sz/test-utils';

import { ProfileImageUpload } from '../ProfileImageUpload';

describe('Profile Image Upload component', () => {
  const testID = 'ProfileImageComponentTestID';
  const getRenderedComponent = () => renderWithProviders(<ProfileImageUpload />);

  it(`should render component correctly`, () => {
    const renderer = getRenderedComponent();
    const renderTree = renderer.toJSON();
    expect(renderTree).toMatchSnapshot();
  });

  it('should find the component via testID', () => {
    const { getByTestId } = getRenderedComponent();
    const foundScreen = getByTestId(testID);
    expect(foundScreen).toBeTruthy();
  });
});
