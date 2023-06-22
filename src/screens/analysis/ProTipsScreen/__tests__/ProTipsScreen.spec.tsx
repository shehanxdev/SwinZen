import { fireEvent } from '@testing-library/react-native';
import * as React from 'react';

import { Checkpoint, SubCheckpoint, VideoType } from '@sz/constants';
import { renderWithProviders } from '@sz/test-utils';

import { ProTipsScreen } from '../ProTipsScreen';

describe('ProTips Screen', () => {
  const testID = 'ProTipsScreenTestID';
  const mockRoute = {
    params: {
      params: {
        videoType: VideoType.DOWNTHELINE,
        checkpoint: Checkpoint.SETUP,
        subCheckpoint: SubCheckpoint.POSTURE,
      },
    },
  };
  const getRenderedScreen = () => renderWithProviders(<ProTipsScreen route={mockRoute} />);

  it(`should render ProTips Screen correctly`, async () => {
    const renderer = getRenderedScreen();
    const renderTree = renderer.toJSON();
    expect(renderTree).toMatchSnapshot();
  });

  it('should find the ProTips Screen via testID', () => {
    const { getByTestId } = getRenderedScreen();
    const foundScreen = getByTestId(testID);
    expect(foundScreen).toBeDefined();
  });

  it('displays correct description based on route params', () => {
    const { getByText } = renderWithProviders(<ProTipsScreen route={mockRoute} />);
    expect(getByText('Take a look at how a PGA Pro would fix this swing fault')).toBeTruthy();
  });

  it('updates description and content when tip type is selected', () => {
    const { getByText } = renderWithProviders(<ProTipsScreen route={mockRoute} />);

    // Simulate selecting different tip types
    fireEvent.press(getByText('AI pro tip'));
    // Assert that the description and content update correctly based on the selected tip type
    expect(getByText("Here's an AI Pro Tip on how to improve your swing!")).toBeTruthy();

    // Simulate selecting another tip type
    fireEvent.press(getByText('Side-by-side'));
    // Assert that the description and content update correctly based on the selected tip type
    expect(getByText('Compare your swing to a pro’s!')).toBeTruthy();
  });

  it('should find the swiper component via testID', () => {
    const { getByTestId } = renderWithProviders(<ProTipsScreen route={mockRoute} />);
    expect(getByTestId(`${testID}-swiper`)).toBeDefined();
  });
});
