import { render } from '@testing-library/react-native';
import * as React from 'react';

import { TermsOfUseScreen } from '../TermsOfUseScreen';

describe('Terms Of Use Screen Screen', () => {
  const testID = 'TermsOfUseScreenTestID';

  const getRenderedScreen = () => render(<TermsOfUseScreen />);

  it(`should render Terms Of Use Screen correctly`, () => {
    const renderer = getRenderedScreen();
    const renderTree = renderer.toJSON();
    expect(renderTree).toMatchSnapshot();
  });

  it('should find the Terms Of Use Screen via testID', () => {
    const { getByTestId } = getRenderedScreen();
    const foundScreen = getByTestId(testID);
    expect(foundScreen).toBeTruthy();
  });
});
