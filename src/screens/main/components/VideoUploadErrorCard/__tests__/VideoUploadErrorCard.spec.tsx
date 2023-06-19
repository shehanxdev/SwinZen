import * as React from 'react';

import { renderWithProviders } from '@sz/test-utils';

import { VideoUploadErrorCard } from '../VideoUploadErrorCard';

describe('Video upload failed card component', () => {
  const getRenderedScreen = mockProps =>
    renderWithProviders(
      <VideoUploadErrorCard
        showFooterAndTextLink={mockProps.showFooterAndTextLink}
        dateUploaded={mockProps?.dateUploaded}
        cameraAngle={mockProps.cameraAngle}
      />,
    );
  it(`should render video upload failed card component correctly when showFooterAndTextLink prop is false`, async () => {
    const renderer = getRenderedScreen({ showFooterAndTextLink: false });
    const renderTree = renderer.toJSON();
    expect(renderTree).toMatchSnapshot();
  });
  it(`should render video upload failed card component correctly when showFooterAndTextLink prop is not set which defaults to true`, async () => {
    const renderer = getRenderedScreen({
      dateUploaded: '2023-06-04T13:22:29.181Z',
      cameraAngle: 'All videos',
    });
    const renderTree = renderer.toJSON();
    expect(renderTree).toMatchSnapshot();
  });
  it('should should not render footer when showFooterAndTextLink prop is false', () => {
    const { queryByTestId } = getRenderedScreen({ showFooterAndTextLink: false });
    const result = queryByTestId('VideoUploadErrorCardFooterTestId');
    expect(result).toBeNull();
  });
  it('should should  render footer when showFooterAndTextLink prop not provided since the prop defaults to true', () => {
    const { getByTestId } = getRenderedScreen({
      dateUploaded: '2023-06-04T13:22:29.181Z',
      cameraAngle: 'All videos',
    });
    const result = getByTestId('VideoUploadErrorCardFooterTestId');
    expect(result).toBeTruthy();
  });
});
