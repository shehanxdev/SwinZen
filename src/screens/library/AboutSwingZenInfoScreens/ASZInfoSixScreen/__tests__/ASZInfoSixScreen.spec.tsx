import { render } from '@testing-library/react-native';
import * as React from 'react';

import { ASZInfoSixScreen } from '../ASZInfoSixScreen';

describe('ASZInfoSix Screen', () => {
  const testID = 'ASZInfoSixScreenTestID';

  const getRenderedScreen = () => render(<ASZInfoSixScreen />);

  it(`should render ASZInfoSix Screen correctly`, () => {
    const renderer = getRenderedScreen();
    const renderTree = renderer.toJSON();
    expect(renderTree).toMatchSnapshot();
  });

  it('should find the ASZInfoSix Screen via testID', () => {
    const { getByTestId } = getRenderedScreen();
    const foundScreen = getByTestId(testID);
    expect(foundScreen).toBeTruthy();
  });
});
