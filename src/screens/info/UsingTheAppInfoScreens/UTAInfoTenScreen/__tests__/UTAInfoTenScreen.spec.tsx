import { render } from '@testing-library/react-native';
import * as React from 'react';

import { UTAInfoTenScreen } from '../UTAInfoTenScreen';

describe('UTAInfoTen Screen', () => {
  const testID = 'UTAInfoTenScreenTestID';

  const getRenderedScreen = () => render(<UTAInfoTenScreen />);

  it(`should render UTAInfoTen Screen correctly`, () => {
    const renderer = getRenderedScreen();
    const renderTree = renderer.toJSON();
    expect(renderTree).toMatchSnapshot();
  });

  it('should find the UTAInfoTen Screen via testID', () => {
    const { getByTestId } = getRenderedScreen();
    const foundScreen = getByTestId(testID);
    expect(foundScreen).toBeTruthy();
  });
});
