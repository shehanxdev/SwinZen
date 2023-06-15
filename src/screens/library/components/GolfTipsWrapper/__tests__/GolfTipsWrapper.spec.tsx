import { SubscriptionType } from '@sz/constants';
import { renderWithProviders } from '@sz/test-utils';

import { GolfTipsWrapper } from '../GolfTipsWrapper';

describe('GolfTipsWrapper component', () => {
  const testID = 'GolfTipsWrapperTestID';
  const mockData = [
    {
      name: 'dummyName',
      subscriptionType: SubscriptionType.FREE,
      thumbnailUrl: 'https://example.com/profile.jpg',
      videos: [],
      createdAt: '2023-05-19T08:00:00Z',
      updatedAt: '2023-05-20T12:00:00Z',
    },
  ];

  const getRenderedComponent = () => renderWithProviders(<GolfTipsWrapper golfTips={mockData} testID={testID} />);

  it(`should render GolfTipsWrapper component correctly`, () => {
    const rendered = getRenderedComponent();
    const renderedTree = rendered.toJSON();
    expect(renderedTree).toMatchSnapshot();
  });

  it(`should find the GolfTipsWrapper component via testID`, () => {
    const { getByTestId } = getRenderedComponent();
    const foundGolfTipsWrapper = getByTestId(testID);
    expect(foundGolfTipsWrapper).toBeTruthy();
  });
});
