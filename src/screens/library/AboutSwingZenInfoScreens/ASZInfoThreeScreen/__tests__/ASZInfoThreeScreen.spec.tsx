import { render } from '@testing-library/react-native';
import * as React from 'react';

import { ASZInfoThreeScreen } from '../ASZInfoThreeScreen';

describe('ASZInfoThree Screen', () => {
  const testID = 'ASZInfoThreeScreenTestID';

  const getRenderedScreen = () => render(<ASZInfoThreeScreen />);

  it(`should render ASZInfoThree Screen correctly`, () => {
    const renderer = getRenderedScreen();
    const renderTree = renderer.toJSON();
    expect(renderTree).toMatchSnapshot();
  });

  it('should find the ASZInfoThree Screen via testID', () => {
    const { getByTestId } = getRenderedScreen();
    const foundScreen = getByTestId(testID);
    expect(foundScreen).toBeTruthy();
  });
});
