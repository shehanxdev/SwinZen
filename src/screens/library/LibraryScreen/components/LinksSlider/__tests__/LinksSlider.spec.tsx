import React from 'react';

import { renderWithProviders } from '@sz/test-utils';

import { LinksSlider } from '../LinksSlider';

describe('LinksSlider component', () => {
  const testID = 'LinksSliderTestID';

  const mockSliderData = [
    ['link 1', 'link 2', 'link 3'],
    ['link 4', 'link 5', 'link 6'],
    ['link 7', 'link 8', 'link 9'],
  ];

  const getRenderedComponent = () => renderWithProviders(<LinksSlider sliderData={mockSliderData} testID={testID} />);

  it(`should render LinksSlider component correctly`, () => {
    const rendered = getRenderedComponent();
    const renderedTree = rendered.toJSON();
    expect(renderedTree).toMatchSnapshot();
  });

  it(`should find the LinksSlider component via testID`, () => {
    const { getByTestId } = getRenderedComponent();
    const foundLinksSlider = getByTestId(testID);
    expect(foundLinksSlider).toBeTruthy();
  });
});
