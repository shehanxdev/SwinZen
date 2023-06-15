import * as React from 'react';

import { renderWithProviders } from '@sz/test-utils';

import { FailedVideoScreen } from '../FailedVideoScreen';

describe('Failed Video Screen', () => {
  const getRenderedScreen = () => renderWithProviders(<FailedVideoScreen />);

  it('should render failed screen ui screen correctly', () => {
    const renderer = getRenderedScreen();
    const renderTree = renderer.toJSON();
    expect(renderTree).toMatchSnapshot();
  });
  it('should find failed video screen screen via TestId', () => {
    const { getByTestId } = getRenderedScreen();
    const results = getByTestId('FailedVideoScreenTestId');
    expect(results).toBeTruthy();
  });
});
