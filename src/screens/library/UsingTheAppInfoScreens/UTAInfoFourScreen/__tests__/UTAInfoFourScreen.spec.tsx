import { render } from '@testing-library/react-native';
import * as React from 'react';

import { UTAInfoFourScreen } from '../UTAInfoFourScreen';

describe('UTAInfoFour Screen', () => {
  const testID = 'UTAInfoFourScreenTestID';

  const getRenderedScreen = () => render(<UTAInfoFourScreen />);

  it(`should render UTAInfoFour Screen correctly`, () => {
    const renderer = getRenderedScreen();
    const renderTree = renderer.toJSON();
    expect(renderTree).toMatchSnapshot();
  });

  it('should find the UTAInfoFour Screen via testID', () => {
    const { getByTestId } = getRenderedScreen();
    const foundScreen = getByTestId(testID);
    expect(foundScreen).toBeTruthy();
  });
});
