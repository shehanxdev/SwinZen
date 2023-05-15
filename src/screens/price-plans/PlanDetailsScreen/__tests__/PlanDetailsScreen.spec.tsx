import { render } from '@testing-library/react-native';
import * as React from 'react';

import { PlanDetailsScreen } from '../PlanDetailsScreen';

describe('Plan Details Screen screen', () => {
  const testID = 'PlanDetailsScreen';
  const mockRoute = {
    params: {
      params: {
        item: {
          name: 'testName',
          description: 'testLongDescription',
          features: ['testFeatureOne', 'testFeatureTwo'],
          price: 99.0,
          frequency: 'testFrequency',
        },
      },
    },
  };
  const getRenderedScreen = () => render(<PlanDetailsScreen route={mockRoute} />);

  it(`should render Plan Details Screen correctly`, async () => {
    const renderer = getRenderedScreen();
    const renderTree = renderer.toJSON();
    expect(renderTree).toMatchSnapshot();
  });

  it('should find the Plan Details Screen via testID', () => {
    const { getByTestId } = getRenderedScreen();
    const foundScreen = getByTestId(testID);
    expect(foundScreen).toBeDefined();
  });
});
