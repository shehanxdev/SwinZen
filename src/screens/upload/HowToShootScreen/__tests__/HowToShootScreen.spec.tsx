import * as React from 'react';

import { SetupValuesType } from '@sz/constants';
import { renderWithProviders } from '@sz/test-utils';

import { HowToShootScreen } from '../HowToShootScreen';

describe('HowToShoot Screen screen', () => {
  const testID = 'HowToShootScreenTestID';
  const mockRoute = {
    params: {
      params: {
        setupValues: {
          videoView: SetupValuesType.DOWN_THE_LINE,
          shootingMethod: SetupValuesType.HAND_HELD,
        },
      },
    },
  };
  const getRenderedScreen = () => renderWithProviders(<HowToShootScreen route={mockRoute} />);

  it(`should render HowToShoot Screen correctly`, async () => {
    const renderer = getRenderedScreen();
    const renderTree = renderer.toJSON();
    expect(renderTree).toMatchSnapshot();
  });

  it('should find the HowToShoot Screen via testID', () => {
    const { getByTestId } = getRenderedScreen();
    const foundScreen = getByTestId(testID);
    expect(foundScreen).toBeDefined();
  });
});
