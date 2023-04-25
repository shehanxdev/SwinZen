import { render } from '@testing-library/react-native';
import * as React from 'react';

import { AboutUsScreen } from '../AboutUsScreen';

describe('About Us Screen Screen', () => {
  const testID = 'AboutUsScreenTestID';

  const getRenderedScreen = () => render(<AboutUsScreen />);

  it(`should render About Us Screen correctly`, () => {
    const renderer = getRenderedScreen();
    const renderTree = renderer.toJSON();
    expect(renderTree).toMatchSnapshot();
  });

  it('should find the About Us Screen via testID', () => {
    const { getByTestId } = getRenderedScreen();
    const foundScreen = getByTestId(testID);
    expect(foundScreen).toBeTruthy();
  });
});
