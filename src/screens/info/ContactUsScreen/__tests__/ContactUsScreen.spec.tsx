import * as React from 'react';

import { renderWithProviders } from '@sz/utils';

import { ContactUsScreen } from '../ContactUsScreen';

describe('ContactUs Screen', () => {
  const testID = 'ContactUsScreenTestID';
  const getRenderedScreen = () => renderWithProviders(<ContactUsScreen />);

  it(`should render ContactUsScreen correctly`, () => {
    const renderer = getRenderedScreen();
    const renderTree = renderer.toJSON();
    expect(renderTree).toMatchSnapshot();
  });

  it('should find the ContactUsScreen via testID', () => {
    const { getByTestId } = getRenderedScreen();
    const foundScreen = getByTestId(testID);
    expect(foundScreen).toBeTruthy();
  });
});
