import { render } from '@testing-library/react-native';
import * as React from 'react';

import { ASZInfoTwoScreen } from '../ASZInfoTwoScreen';

describe('ASZInfoTwo Screen', () => {
  const testID = 'ASZInfoTwoScreenTestID';

  const getRenderedScreen = () => render(<ASZInfoTwoScreen />);

  it(`should render ASZInfoTwo Screen correctly`, () => {
    const renderer = getRenderedScreen();
    const renderTree = renderer.toJSON();
    expect(renderTree).toMatchSnapshot();
  });

  it('should find the ASZInfoTwo Screen via testID', () => {
    const { getByTestId } = getRenderedScreen();
    const foundScreen = getByTestId(testID);
    expect(foundScreen).toBeTruthy();
  });
});
