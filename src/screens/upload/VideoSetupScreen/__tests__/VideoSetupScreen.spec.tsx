import { render } from '@testing-library/react-native';
import * as React from 'react';

import { VideoSetupScreen } from '../VideoSetupScreen';

describe('Video Setup Screen Screen', () => {
  const testID = 'VideoSetupScreenTestID';

  const getRenderedScreen = () => render(<VideoSetupScreen />);

  it(`should render Video Setup Screen correctly`, () => {
    const renderer = getRenderedScreen();
    const renderTree = renderer.toJSON();
    expect(renderTree).toMatchSnapshot();
  });

  it('should find the Video Setup Screen via testID', () => {
    const { getByTestId } = getRenderedScreen();
    const foundScreen = getByTestId(testID);
    expect(foundScreen).toBeTruthy();
  });
});
