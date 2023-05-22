import { render } from '@testing-library/react-native';
import * as React from 'react';

import { UTAInfoThirteenScreen } from '../UTAInfoThirteenScreen';

describe('UTAInfoThirteen Screen', () => {
  const testID = 'UTAInfoThirteenScreenTestID';

  const getRenderedScreen = () => render(<UTAInfoThirteenScreen />);

  it(`should render UTAInfoThirteen Screen correctly`, () => {
    const renderer = getRenderedScreen();
    const renderTree = renderer.toJSON();
    expect(renderTree).toMatchSnapshot();
  });

  it('should find the UTAInfoThirteen Screen via testID', () => {
    const { getByTestId } = getRenderedScreen();
    const foundScreen = getByTestId(testID);
    expect(foundScreen).toBeTruthy();
  });
});
