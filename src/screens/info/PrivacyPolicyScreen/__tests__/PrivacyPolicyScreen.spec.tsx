import { render } from '@testing-library/react-native';
import * as React from 'react';

import { PrivacyPolicyScreen } from '../PrivacyPolicyScreen';

describe('Privacy Policy Screen Screen', () => {
  const testID = 'PrivacyPolicyScreenTestID';

  const getRenderedScreen = () => render(<PrivacyPolicyScreen />);

  it(`should render Privacy Policy Screen correctly`, () => {
    const renderer = getRenderedScreen();
    const renderTree = renderer.toJSON();
    expect(renderTree).toMatchSnapshot();
  });

  it('should find the Privacy Policy Screen via testID', () => {
    const { getByTestId } = getRenderedScreen();
    const foundScreen = getByTestId(testID);
    expect(foundScreen).toBeTruthy();
  });
});
