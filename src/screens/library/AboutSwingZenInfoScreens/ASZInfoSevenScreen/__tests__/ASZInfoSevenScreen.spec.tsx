import { render } from '@testing-library/react-native';
import * as React from 'react';

import { ASZInfoSevenScreen } from '../ASZInfoSevenScreen';

describe('ASZInfoSeven Screen', () => {
  const testID = 'ASZInfoSevenScreenTestID';

  const getRenderedScreen = () => render(<ASZInfoSevenScreen />);

  it(`should render ASZInfoSeven Screen correctly`, () => {
    const renderer = getRenderedScreen();
    const renderTree = renderer.toJSON();
    expect(renderTree).toMatchSnapshot();
  });

  it('should find the ASZInfoSeven Screen via testID', () => {
    const { getByTestId } = getRenderedScreen();
    const foundScreen = getByTestId(testID);
    expect(foundScreen).toBeTruthy();
  });
});
