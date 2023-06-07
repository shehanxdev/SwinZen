import { render } from '@testing-library/react-native';
import * as React from 'react';

import { ProfileInfoCard } from '../ProfileInfoCard';

describe('Profile Info Card component', () => {
  const testID = 'ProfileInfoCardTestID';
  const getRenderedComponent = () =>
    render(
      <ProfileInfoCard>
        <></>
      </ProfileInfoCard>,
    );

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
