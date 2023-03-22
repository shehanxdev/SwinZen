import { render } from '@testing-library/react-native';
import * as React from 'react';

import { PrivacyPolicyScreen } from '../PrivacyPolicyScreen';

describe('PrivacyPolicyScreen Screen', () => {
  const testID = 'PrivacyPolicyScreenTestID';

  const getRenderedScreen = () => render(<PrivacyPolicyScreen />);

  it(`should render PrivacyPolicyScreen correctly`, () => {
    const renderer = getRenderedScreen();
    const renderTree = renderer.toJSON();
    expect(renderTree).toMatchSnapshot();
  });

  it('should find the PrivacyPolicyScreen via testID', () => {
    const { getByTestId } = getRenderedScreen();
    const foundScreen = getByTestId(testID);
    expect(foundScreen).toBeTruthy();
  });
});
