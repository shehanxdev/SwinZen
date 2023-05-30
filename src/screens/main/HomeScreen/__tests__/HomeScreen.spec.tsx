import * as React from 'react';

import { renderWithProviders } from '@sz/utils';

import { HomeScreen } from './../HomeScreen';

describe('Home screen', () => {
  const getRenderedScreen = () => renderWithProviders(<HomeScreen />);

  it(`should render Home screen correctly`, async () => {
    const renderer = getRenderedScreen();
    const renderTree = renderer.toJSON();
    expect(renderTree).toMatchSnapshot();
  });
});
