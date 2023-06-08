import { render } from '@testing-library/react-native';
import * as React from 'react';

import { ImageUplaodModal } from '../ImageUplaodModal';

describe('ImageUplaodModal Component', () => {
  const testID = 'ImageUplaodModalTestID';
  const mockFn = jest.fn();

  const getRenderedComponent = () =>
    render(
      <ImageUplaodModal
        testID={testID}
        showModal={false}
        handleModalClose={mockFn}
        handleCamera={mockFn}
        handleGallery={mockFn}
      />,
    );

  it(`should render ImageUplaodModal component correctly`, () => {
    const rendered = getRenderedComponent();
    const renderedTree = rendered.toJSON();
    expect(renderedTree).toMatchSnapshot();
  });
  it(`should find the ImageUplaodModal component via testID`, () => {
    const { getByTestId } = getRenderedComponent();
    const foundCustomHeaderComponent = getByTestId(testID);
    expect(foundCustomHeaderComponent).toBeTruthy();
  });
});
