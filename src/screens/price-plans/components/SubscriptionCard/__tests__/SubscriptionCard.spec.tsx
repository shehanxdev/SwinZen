import * as React from 'react';

import { renderWithProviders } from '@sz/utils';

import { SubscriptionCard } from './../SubscriptionCard';

describe('SubscriptionCard Component', () => {
  const testID = 'SubscriptionCardTestID';
  const title = 'testTitle';
  const price = 99.99;
  const frequency = 'testFrequency';
  const featureList = ['testFeature', 'testFeature'];
  const mockOnCardPressFunction = jest.fn();

  const getRenderedComponent = () =>
    renderWithProviders(
      <SubscriptionCard
        testID={testID}
        title={title}
        price={price}
        frequency={frequency}
        featureList={featureList}
        onCardPress={mockOnCardPressFunction}
      />,
    );

  it(`should render SubscriptionCard component correctly`, () => {
    const rendered = getRenderedComponent();
    const renderedTree = rendered.toJSON();
    expect(renderedTree).toMatchSnapshot();
  });

  it('should find the SubscriptionCard component via testID', () => {
    const { getByTestId } = getRenderedComponent();
    const foundSubscriptionCardComponent = getByTestId(testID);
    expect(foundSubscriptionCardComponent).toBeTruthy();
  });
});
