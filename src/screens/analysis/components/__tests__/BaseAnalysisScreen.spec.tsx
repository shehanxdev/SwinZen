import * as React from 'react';

import { renderWithProviders } from '@sz/test-utils';

import { BaseAnalysisScreen } from '../BaseAnalysisScreen';

describe('BaseAnalysis Screen', () => {
  const testID = 'BaseAnalysisScreenTestID';
  const getRenderedScreen = () =>
    renderWithProviders(
      <BaseAnalysisScreen>
        <></>
      </BaseAnalysisScreen>,
    );

  it(`should render BaseAnalysis Screen correctly`, async () => {
    const renderer = getRenderedScreen();
    const renderTree = renderer.toJSON();
    expect(renderTree).toMatchSnapshot();
  });

  it('should find the BaseAnalysis Screen via testID', () => {
    const { getByTestId } = getRenderedScreen();
    const foundScreen = getByTestId(testID);
    expect(foundScreen).toBeDefined();
  });
});
