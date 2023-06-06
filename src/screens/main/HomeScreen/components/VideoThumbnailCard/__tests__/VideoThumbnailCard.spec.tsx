import * as React from 'react';

import { renderWithProviders } from '@sz/test-utils';

import { VideoThumbnailCard } from '../VideoThumbnailCard';

describe('Home screen', () => {
  const mockVideo = {
    id: 'id4',
    userId: 'string',
    name: 'string',
    videoUrl: 'string',
    videoType: 'Face View',
    thumbnailUrl: 'https://i.ibb.co/XFvHx8J/Rectangle-132.png',
    grading: 4.7,
    createdAt: '2023-06-04T13:22:29.181Z',
  };
  const getRenderedScreen = () => renderWithProviders(<VideoThumbnailCard video={mockVideo} />);

  it(`should render VideoThumbnailCard correctly`, async () => {
    const renderer = getRenderedScreen();
    const renderTree = renderer.toJSON();
    expect(renderTree).toMatchSnapshot();
  });
});
