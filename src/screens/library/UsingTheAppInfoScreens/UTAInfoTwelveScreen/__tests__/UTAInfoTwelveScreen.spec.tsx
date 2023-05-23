import { render } from '@testing-library/react-native';
import * as React from 'react';

import { UTAInfoTwelveScreen } from '../UTAInfoTwelveScreen';

describe('UTAInfoTwelve Screen', () => {
  const testID = 'UTAInfoTwelveScreenTestID';

  const getRenderedScreen = () => render(<UTAInfoTwelveScreen />);

  it(`should render UTAInfoTwelve Screen correctly`, () => {
    const renderer = getRenderedScreen();
    const renderTree = renderer.toJSON();
    expect(renderTree).toMatchSnapshot();
  });

  it('should find the UTAInfoTwelve Screen via testID', () => {
    const { getByTestId } = getRenderedScreen();
    const foundScreen = getByTestId(testID);
    expect(foundScreen).toBeTruthy();
  });
});
