import * as React from 'react';

import { renderWithProviders } from '@sz/test-utils';

import { ProfileSettingsScreen } from '../ProfileSettingsScreen';

describe('Profile Settings Screen Screen', () => {
  const testID = 'ProfileSettingsScreenTestID';

  const getRenderedScreen = () => renderWithProviders(<ProfileSettingsScreen />);

  beforeEach(() => {
    jest.useFakeTimers().setSystemTime(new Date('2023-05-30'));
  });

  it(`should render Profile Settings Screen correctly`, () => {
    const renderer = getRenderedScreen();
    const renderTree = renderer.toJSON();
    expect(renderTree).toMatchSnapshot();
  });

  it('should find the Profile Settings Screen via testID', () => {
    const { getByTestId } = getRenderedScreen();
    const foundScreen = getByTestId(testID);
    expect(foundScreen).toBeTruthy();
  });
});
