import * as React from 'react';

import { renderWithProviders } from '@sz/test-utils';

import { GolfTipsPlaylistScreen } from '../GolfTipsPlaylistScreen';

describe('GolfTips Playlist Screen', () => {
  const testID = 'GolfTipsPlaylistScreenTestID';
  const mockRoute = { params: { params: { tipsCategory: 'mockCategory', tipsCategoryId: 12345 } } };

  const getRenderedScreen = () => renderWithProviders(<GolfTipsPlaylistScreen route={mockRoute} />);

  it(`should render GolfTips Playlist Screen correctly`, () => {
    const renderer = getRenderedScreen();
    const renderTree = renderer.toJSON();
    expect(renderTree).toMatchSnapshot();
  });

  it('should find the GolfTips Playlist Screen via testID', () => {
    const { getByTestId } = getRenderedScreen();
    const foundScreen = getByTestId(testID);
    expect(foundScreen).toBeTruthy();
  });
});
