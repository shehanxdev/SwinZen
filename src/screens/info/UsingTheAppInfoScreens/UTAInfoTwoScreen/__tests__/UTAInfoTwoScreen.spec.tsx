import { render } from '@testing-library/react-native';
import * as React from 'react';

import { UTAInfoTwoScreen } from '../UTAInfoTwoScreen';

describe('UTAInfoTwo Screen', () => {
  const testID = 'UTAInfoTwoScreenTestID';

  const getRenderedScreen = () => render(<UTAInfoTwoScreen />);

  it(`should render UTAInfoTwo Screen correctly`, () => {
    const renderer = getRenderedScreen();
    const renderTree = renderer.toJSON();
    expect(renderTree).toMatchSnapshot();
  });

  it('should find the UTAInfoTwo Screen via testID', () => {
    const { getByTestId } = getRenderedScreen();
    const foundScreen = getByTestId(testID);
    expect(foundScreen).toBeTruthy();
  });
});
