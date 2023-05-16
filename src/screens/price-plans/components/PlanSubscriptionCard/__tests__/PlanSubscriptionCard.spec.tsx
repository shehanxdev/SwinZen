import { render } from '@testing-library/react-native';
import * as React from 'react';

import { PlanSubscriptionCard } from './../PlanSubscriptionCard';

describe('PlanSubscriptionCard Component', () => {
  const testID = 'PlanSubscriptionCardTestID';
  const title = 'testTitle';
  const price = 99.99;
  const frequency = 'testFrequency';
  const featureList = ['testFeature', 'testFeature'];
  const mockOnCardPressFunction = jest.fn();

  const getRenderedComponent = () =>
    render(
      <PlanSubscriptionCard
        testID={testID}
        title={title}
        price={price}
        frequency={frequency}
        featureList={featureList}
        onCardPress={mockOnCardPressFunction}
      />,
    );

  it(`should render PlanSubscription Card component correctly`, () => {
    const rendered = getRenderedComponent();
    const renderedTree = rendered.toJSON();
    expect(renderedTree).toMatchSnapshot();
  });

  it('should find the PlanSubscription Card component via testID', () => {
    const { getByTestId } = getRenderedComponent();
    const foundPlanSubscriptionCardComponent = getByTestId(testID);
    expect(foundPlanSubscriptionCardComponent).toBeTruthy();
  });
});
