import * as React from 'react';

import { renderWithProviders } from '@sz/test-utils';

import { LibraryScreen } from '../LibraryScreen';

describe('Library Screen', () => {
  const testID = 'LibraryScreenTestID';

  const getRenderedScreen = () => renderWithProviders(<LibraryScreen />);

  it(`should render Library Screen correctly`, () => {
    const renderer = getRenderedScreen();
    const renderTree = renderer.toJSON();
    expect(renderTree).toMatchSnapshot();
  });

  it('should find the Library Screen via testID', () => {
    const { getByTestId } = getRenderedScreen();
    const foundScreen = getByTestId(testID);
    expect(foundScreen).toBeTruthy();
  });
});
