import * as React from 'react';

import { renderWithProviders } from '@sz/utils';

import { UploadedVideoCountBanner } from '../UploadedVideoCountBanner';

describe('UploadedVideoCountBanner Component', () => {
  const testID = 'UploadedVideoCountBannerComponentTestID';
  const videoCount = 24;
  const swinZenUniVideoCount = 82;

  const getRenderedScreen = () =>
    renderWithProviders(
      <UploadedVideoCountBanner VideoCount={videoCount} SwinZenUniVideoCount={swinZenUniVideoCount} />,
    );

  it(`should render Component correctly`, () => {
    const renderer = getRenderedScreen();
    const renderTree = renderer.toJSON();
    expect(renderTree).toMatchSnapshot();
  });

  it('should find the Component via testID', () => {
    const { getByTestId } = getRenderedScreen();
    const foundScreen = getByTestId(testID);
    expect(foundScreen).toBeTruthy();
  });
});
