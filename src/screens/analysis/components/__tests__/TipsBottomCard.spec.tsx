import * as React from 'react';

import { TipType } from '@sz/constants';
import { renderWithProviders } from '@sz/test-utils';

import { TipsBottomCard } from '../TipsBottomCard';

describe('TipsBottomCard component', () => {
  const testID = 'TipsBottomCardTestID';
  const mockFn = jest.fn();
  const getRenderedScreen = () =>
    renderWithProviders(
      <TipsBottomCard description="dummyDescription" tipType={TipType.PGA_PRO_TIPS} onSetTipType={mockFn} />,
    );

  it(`should render TipsBottomCard component correctly`, async () => {
    const renderer = getRenderedScreen();
    const renderTree = renderer.toJSON();
    expect(renderTree).toMatchSnapshot();
  });

  it('should find the TipsBottomCard component via testID', () => {
    const { getByTestId } = getRenderedScreen();
    const foundScreen = getByTestId(testID);
    expect(foundScreen).toBeDefined();
  });
});
