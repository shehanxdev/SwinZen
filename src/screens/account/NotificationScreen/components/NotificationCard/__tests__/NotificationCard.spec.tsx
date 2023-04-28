import * as React from 'react';

import { renderWithProviders } from '@sz/utils';

import { NotificationCard } from './../NotificationCard';

describe('NotificationCard Component', () => {
  const testID = 'NotificationCardTestID';
  const mackTime = new Date();
  const dummyMessage = 'test message';

  const getRenderedComponent = () =>
    renderWithProviders(<NotificationCard testID={testID} time={mackTime} readStatus={true} message={dummyMessage} />);

  it(`should render NotificationCard component correctly`, () => {
    const rendered = getRenderedComponent();
    const renderedTree = rendered.toJSON();
    expect(renderedTree).toMatchSnapshot();
  });

  it('should find the NotificationCard component via testID', () => {
    const { getByTestId } = getRenderedComponent();
    const foundCustomHeaderComponent = getByTestId(testID);
    expect(foundCustomHeaderComponent).toBeTruthy();
  });
});
