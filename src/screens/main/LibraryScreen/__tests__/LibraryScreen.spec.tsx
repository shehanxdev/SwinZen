import { render } from '@testing-library/react-native';
import * as React from 'react';

import { LibraryScreen } from '../LibraryScreen';

describe('Library Screen', () => {
  const testID = 'LibraryScreenTestID';

  const getRenderedScreen = () => render(<LibraryScreen />);

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
