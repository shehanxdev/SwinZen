import { render } from '@testing-library/react-native';
import * as React from 'react';

import { LibraryInfoScreen } from '../LibraryInfoScreen';

describe('Library Info Screen', () => {
  const testID = 'LibraryInfoScreenTestID';

  const mockRoute = {
    params: {
      params: {
        withIndex: true,
        content: {
          description: 'dummy description',
          points: [{ title: 'dummy title', body: 'dummy body' }],
        },
      },
    },
  };

  const getRenderedScreen = () => render(<LibraryInfoScreen route={mockRoute} />);

  it(`should render Library Info Screen correctly`, () => {
    const renderer = getRenderedScreen();
    const renderTree = renderer.toJSON();
    expect(renderTree).toMatchSnapshot();
  });

  it('should find the Library Info Screen via testID', () => {
    const { getByTestId } = getRenderedScreen();
    const foundScreen = getByTestId(testID);
    expect(foundScreen).toBeTruthy();
  });
});
