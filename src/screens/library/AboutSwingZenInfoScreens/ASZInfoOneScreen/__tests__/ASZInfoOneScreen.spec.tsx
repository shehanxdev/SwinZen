import { render } from '@testing-library/react-native';
import * as React from 'react';

import { ASZInfoOneScreen } from '../ASZInfoOneScreen';

describe('ASZInfoOne Screen', () => {
  const testID = 'ASZInfoOneScreenTestID';

  const getRenderedScreen = () => render(<ASZInfoOneScreen />);

  it(`should render ASZInfoOne Screen correctly`, () => {
    const renderer = getRenderedScreen();
    const renderTree = renderer.toJSON();
    expect(renderTree).toMatchSnapshot();
  });

  it('should find the ASZInfoOne Screen via testID', () => {
    const { getByTestId } = getRenderedScreen();
    const foundScreen = getByTestId(testID);
    expect(foundScreen).toBeTruthy();
  });
});
