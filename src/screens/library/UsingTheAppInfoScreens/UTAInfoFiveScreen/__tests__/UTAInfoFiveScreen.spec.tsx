import { render } from '@testing-library/react-native';
import * as React from 'react';

import { UTAInfoFiveScreen } from '../UTAInfoFiveScreen';

describe('UTAInfoFive Screen', () => {
  const testID = 'UTAInfoFiveScreenTestID';

  const getRenderedScreen = () => render(<UTAInfoFiveScreen />);

  it(`should render UTAInfoFive Screen correctly`, () => {
    const renderer = getRenderedScreen();
    const renderTree = renderer.toJSON();
    expect(renderTree).toMatchSnapshot();
  });

  it('should find the UTAInfoFive Screen via testID', () => {
    const { getByTestId } = getRenderedScreen();
    const foundScreen = getByTestId(testID);
    expect(foundScreen).toBeTruthy();
  });
});
