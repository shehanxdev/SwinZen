import { render } from '@testing-library/react-native';
import * as React from 'react';

import { UTAInfoSixScreen } from '../UTAInfoSixScreen';

describe('UTAInfoSix Screen', () => {
  const testID = 'UTAInfoSixScreenTestID';

  const getRenderedScreen = () => render(<UTAInfoSixScreen />);

  it(`should render UTAInfoSix Screen correctly`, () => {
    const renderer = getRenderedScreen();
    const renderTree = renderer.toJSON();
    expect(renderTree).toMatchSnapshot();
  });

  it('should find the UTAInfoSix Screen via testID', () => {
    const { getByTestId } = getRenderedScreen();
    const foundScreen = getByTestId(testID);
    expect(foundScreen).toBeTruthy();
  });
});
