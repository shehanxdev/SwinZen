import { render } from '@testing-library/react-native';
import * as React from 'react';

import { UTAInfoEightScreen } from '../UTAInfoEightScreen';

describe('UTAInfoEight Screen', () => {
  const testID = 'UTAInfoEightScreenTestID';

  const getRenderedScreen = () => render(<UTAInfoEightScreen />);

  it(`should render UTAInfoEight Screen correctly`, () => {
    const renderer = getRenderedScreen();
    const renderTree = renderer.toJSON();
    expect(renderTree).toMatchSnapshot();
  });

  it('should find the UTAInfoEight Screen via testID', () => {
    const { getByTestId } = getRenderedScreen();
    const foundScreen = getByTestId(testID);
    expect(foundScreen).toBeTruthy();
  });
});
