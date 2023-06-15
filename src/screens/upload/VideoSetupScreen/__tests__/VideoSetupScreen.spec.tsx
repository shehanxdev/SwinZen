import * as React from 'react';

import { renderWithProviders } from '@sz/test-utils';

import { VideoSetupScreen } from '../VideoSetupScreen';

describe('Video Setup Screen Screen', () => {
  const testID = 'VideoSetupScreenTestID';

  const getRenderedScreen = () => renderWithProviders(<VideoSetupScreen />);

  it(`should render Video Setup Screen correctly`, () => {
    const renderer = getRenderedScreen();
    const renderTree = renderer.toJSON();
    expect(renderTree).toMatchSnapshot();
  });

  it('should find the Video Setup Screen via testID', () => {
    const { getByTestId } = getRenderedScreen();
    const foundScreen = getByTestId(testID);
    expect(foundScreen).toBeTruthy();
  });
});
