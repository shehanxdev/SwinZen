import * as React from 'react';

import { renderWithProviders } from '@sz/utils';

import { NotificationScreen } from '../NotificationScreen';

describe('Notification Screen Screen', () => {
  const testID = 'NotificationScreenTestID';

  const getRenderedScreen = () => renderWithProviders(<NotificationScreen />);

  it(`should render Notification Screen correctly`, () => {
    const renderer = getRenderedScreen();
    const renderTree = renderer.toJSON();
    expect(renderTree).toMatchSnapshot();
  });

  it('should find the Notification Screen via testID', () => {
    const { getByTestId } = getRenderedScreen();
    const foundScreen = getByTestId(testID);
    expect(foundScreen).toBeTruthy();
  });
});
