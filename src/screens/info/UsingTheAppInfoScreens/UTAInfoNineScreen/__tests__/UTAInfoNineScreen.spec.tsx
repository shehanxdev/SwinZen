import { render } from '@testing-library/react-native';
import * as React from 'react';

import { UTAInfoNineScreen } from '../UTAInfoNineScreen';

describe('UTAInfoNine Screen', () => {
  const testID = 'UTAInfoNineScreenTestID';

  const getRenderedScreen = () => render(<UTAInfoNineScreen />);

  it(`should render UTAInfoNine Screen correctly`, () => {
    const renderer = getRenderedScreen();
    const renderTree = renderer.toJSON();
    expect(renderTree).toMatchSnapshot();
  });

  it('should find the UTAInfoNine Screen via testID', () => {
    const { getByTestId } = getRenderedScreen();
    const foundScreen = getByTestId(testID);
    expect(foundScreen).toBeTruthy();
  });
});
