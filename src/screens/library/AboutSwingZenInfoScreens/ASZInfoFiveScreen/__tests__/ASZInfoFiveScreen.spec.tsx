import { render } from '@testing-library/react-native';
import * as React from 'react';

import { ASZInfoFiveScreen } from '../ASZInfoFiveScreen';

describe('ASZInfoFive Screen', () => {
  const testID = 'ASZInfoFiveScreenTestID';

  const getRenderedScreen = () => render(<ASZInfoFiveScreen />);

  it(`should render ASZInfoFive Screen correctly`, () => {
    const renderer = getRenderedScreen();
    const renderTree = renderer.toJSON();
    expect(renderTree).toMatchSnapshot();
  });

  it('should find the ASZInfoFive Screen via testID', () => {
    const { getByTestId } = getRenderedScreen();
    const foundScreen = getByTestId(testID);
    expect(foundScreen).toBeTruthy();
  });
});
