import { render } from '@testing-library/react-native';
import * as React from 'react';

import { UTAInfoOneScreen } from '../UTAInfoOneScreen';

describe('UTAInfoOne Screen', () => {
  const testID = 'UTAInfoOneScreenTestID';

  const getRenderedScreen = () => render(<UTAInfoOneScreen />);

  it(`should render UTAInfoOne Screen correctly`, () => {
    const renderer = getRenderedScreen();
    const renderTree = renderer.toJSON();
    expect(renderTree).toMatchSnapshot();
  });

  it('should find the UTAInfoOne Screen via testID', () => {
    const { getByTestId } = getRenderedScreen();
    const foundScreen = getByTestId(testID);
    expect(foundScreen).toBeTruthy();
  });
});
