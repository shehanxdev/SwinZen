import { render } from '@testing-library/react-native';
import * as React from 'react';

import { UTAInfoElevenScreen } from '../UTAInfoElevenScreen';

describe('UTAInfoEleven Screen', () => {
  const testID = 'UTAInfoElevenScreenTestID';

  const getRenderedScreen = () => render(<UTAInfoElevenScreen />);

  it(`should render UTAInfoEleven Screen correctly`, () => {
    const renderer = getRenderedScreen();
    const renderTree = renderer.toJSON();
    expect(renderTree).toMatchSnapshot();
  });

  it('should find the UTAInfoEleven Screen via testID', () => {
    const { getByTestId } = getRenderedScreen();
    const foundScreen = getByTestId(testID);
    expect(foundScreen).toBeTruthy();
  });
});
