import { render } from '@testing-library/react-native';
import * as React from 'react';

import { TermsOfUseScreen } from '../TermsOfUseScreen';

describe('TermsOfUseScreen Screen', () => {
  const testID = 'TermsOfUseScreenTestID';

  const getRenderedScreen = () => render(<TermsOfUseScreen />);

  it(`should render TermsOfUseScreen correctly`, () => {
    const renderer = getRenderedScreen();
    const renderTree = renderer.toJSON();
    expect(renderTree).toMatchSnapshot();
  });

  it('should find the TermsOfUseScreen via testID', () => {
    const { getByTestId } = getRenderedScreen();
    const foundScreen = getByTestId(testID);
    expect(foundScreen).toBeTruthy();
  });
});
