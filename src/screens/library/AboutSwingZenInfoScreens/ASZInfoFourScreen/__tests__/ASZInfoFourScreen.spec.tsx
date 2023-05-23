import { render } from '@testing-library/react-native';
import * as React from 'react';

import { ASZInfoFourScreen } from '../ASZInfoFourScreen';

describe('ASZInfoFour Screen', () => {
  const testID = 'ASZInfoFourScreenTestID';

  const getRenderedScreen = () => render(<ASZInfoFourScreen />);

  it(`should render ASZInfoFour Screen correctly`, () => {
    const renderer = getRenderedScreen();
    const renderTree = renderer.toJSON();
    expect(renderTree).toMatchSnapshot();
  });

  it('should find the ASZInfoFour Screen via testID', () => {
    const { getByTestId } = getRenderedScreen();
    const foundScreen = getByTestId(testID);
    expect(foundScreen).toBeTruthy();
  });
});
