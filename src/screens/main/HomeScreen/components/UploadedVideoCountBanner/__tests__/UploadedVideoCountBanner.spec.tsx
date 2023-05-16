import { render } from '@testing-library/react-native';
import * as React from 'react';

import { UploadedVideoCountBanner } from '../UploadedVideoCountBanner';

describe('UploadedVideoCountBanner Component', () => {
  const testID = 'UploadedVideoCountBannerComponentTestID';
  const videoCount = 24;
  const swinZenUniVideoCount = 82;

  const getRenderedComponent = () =>
    render(<UploadedVideoCountBanner videoCount={videoCount} swinZenUniVideoCount={swinZenUniVideoCount} />);

  it(`should render Component correctly`, () => {
    const renderer = getRenderedComponent();
    const renderTree = renderer.toJSON();
    expect(renderTree).toMatchSnapshot();
  });

  it('should find the Component via testID', () => {
    const { getByTestId } = getRenderedComponent();
    const foundScreen = getByTestId(testID);
    expect(foundScreen).toBeTruthy();
  });
});
