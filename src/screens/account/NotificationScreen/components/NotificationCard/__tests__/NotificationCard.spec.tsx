import * as React from 'react';

import { renderWithProviders } from '@sz/test-utils';

import { NotificationCard } from '../NotificationCard';

describe('NotificationCard Component', () => {
  const testID = 'NotificationCardTestID';
  const mockTime = new Date('2023-05-15');
  const dummtTitle = 'Title One';
  const dummyMessage = 'test message';
  const mockOnPressFunction = jest.fn();

  const getRenderedComponent = () =>
    renderWithProviders(
      <NotificationCard
        testID={testID}
        time={mockTime}
        readStatus={true}
        title={dummtTitle}
        message={dummyMessage}
        handleOnPress={mockOnPressFunction}
      />,
    );

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
