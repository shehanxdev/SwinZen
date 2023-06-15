import { images } from '@sz/assets';
import { renderWithProviders } from '@sz/test-utils';

import { GolfTipCard } from '../GolfTipCard';

describe('GolfTipCard component', () => {
  const testID = 'GolfTipCardTestID';
  const onPressHandlerMock = jest.fn();

  const mockData = {
    id: 1,
    videosCount: 9,
    backgroundImage: images.AITools,
    label: 'AI tools',
  };

  const getRenderedComponent = () =>
    renderWithProviders(
      <GolfTipCard
        testID={testID}
        onPress={onPressHandlerMock}
        videosCount={mockData.videosCount}
        backgroundImage={mockData.backgroundImage}
        label={mockData.label}
      />,
    );

  it(`should render GolfTipCard component correctly`, () => {
    const rendered = getRenderedComponent();
    const renderedTree = rendered.toJSON();
    expect(renderedTree).toMatchSnapshot();
  });

  it(`should find the GolfTipCard component via testID`, () => {
    const { getByTestId } = getRenderedComponent();
    const foundGolfTipCard = getByTestId(testID);
    expect(foundGolfTipCard).toBeTruthy();
  });

  it('displays the correct label and video count', () => {
    const { getByText } = getRenderedComponent();

    const videosCountText = getByText(`${mockData.videosCount} Videos`);
    const labelText = getByText(mockData.label);

    expect(videosCountText).toBeTruthy();
    expect(labelText).toBeTruthy();
  });
});
