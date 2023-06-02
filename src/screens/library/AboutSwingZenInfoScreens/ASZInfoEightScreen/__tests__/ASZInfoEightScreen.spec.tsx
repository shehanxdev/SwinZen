import { render } from '@testing-library/react-native';
import * as React from 'react';

import { ASZInfoEightScreen } from '../ASZInfoEightScreen';

describe('ASZInfoEight Screen', () => {
  const testID = 'ASZInfoEightScreenTestID';

  const getRenderedScreen = () => render(<ASZInfoEightScreen />);

  it(`should render ASZInfoEight Screen correctly`, () => {
    const renderer = getRenderedScreen();
    const renderTree = renderer.toJSON();
    expect(renderTree).toMatchSnapshot();
  });

  it('should find the ASZInfoEight Screen via testID', () => {
    const { getByTestId } = getRenderedScreen();
    const foundScreen = getByTestId(testID);
    expect(foundScreen).toBeTruthy();
  });
});
