import * as React from 'react';

import { renderWithProviders } from '@sz/test-utils';

import { VideoThumbnailCard } from '../VideoThumbnailCard';

describe('Home screen', () => {
  const mockVideoData = {
    id: 'id4',
    userId: 'string',
    name: 'string',
    videoUrl: 'string',
    videoType: 'Face View',
    thumbnailUrl: 'https://i.ibb.co/XFvHx8J/Rectangle-132.png',
    grading: null,
    createdAt: '2023-06-04T13:22:29.181Z',
  };
  const getRenderedScreen = videoData => renderWithProviders(<VideoThumbnailCard video={videoData} />);

  it(`should render VideoThumbnailCard fail state correctly`, async () => {
    const renderer = getRenderedScreen({ ...mockVideoData, grading: 4.7 });
    const renderTree = renderer.toJSON();
    expect(renderTree).toMatchSnapshot();
  });
  it(`should render VideoThumbnailCard pass state correctly`, async () => {
    const renderer = getRenderedScreen({ ...mockVideoData, grading: 8.7 });
    const renderTree = renderer.toJSON();
    expect(renderTree).toMatchSnapshot();
  });
});
