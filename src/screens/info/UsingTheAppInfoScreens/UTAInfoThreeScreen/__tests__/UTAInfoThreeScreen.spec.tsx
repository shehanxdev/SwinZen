import { render } from '@testing-library/react-native';
import * as React from 'react';

import { UTAInfoThreeScreen } from '../UTAInfoThreeScreen';

describe('UTAInfoThree Screen', () => {
  const testID = 'UTAInfoThreeScreenTestID';

  const getRenderedScreen = () => render(<UTAInfoThreeScreen />);

  it(`should render UTAInfoThree Screen correctly`, () => {
    const renderer = getRenderedScreen();
    const renderTree = renderer.toJSON();
    expect(renderTree).toMatchSnapshot();
  });

  it('should find the UTAInfoThree Screen via testID', () => {
    const { getByTestId } = getRenderedScreen();
    const foundScreen = getByTestId(testID);
    expect(foundScreen).toBeTruthy();
  });
});
