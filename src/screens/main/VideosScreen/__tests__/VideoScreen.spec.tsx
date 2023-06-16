import * as React from 'react';

import { renderWithProviders } from '@sz/test-utils';

import { VideosScreen } from '../VideosScreen';

describe('Videosscreen', () => {
  const getRenderedScreen = () => renderWithProviders(<VideosScreen />);

  it(`should render Videos Screen correctly`, async () => {
    const renderer = getRenderedScreen();
    const renderTree = renderer.toJSON();
    expect(renderTree).toMatchSnapshot();
  });
});
