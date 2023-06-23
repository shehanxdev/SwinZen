import { fireEvent, render } from '@testing-library/react-native';
import * as React from 'react';
import { act } from 'react-test-renderer';

import { NavigationService } from '@sz/services';

import { HeaderRightCloseButton } from '../HeaderRightCloseButton';

describe('HeaderRightCloseButton', () => {
  const TEST_ID = 'HeaderRightCloseButton';

  const getRenderedComponent = () => render(<HeaderRightCloseButton />);

  it(`should render correctly`, () => {
    expect(getRenderedComponent().toJSON()).toMatchSnapshot();
  });

  it('should call NavigationService.goBack on press', async () => {
    const { getByTestId } = getRenderedComponent();
    const button = getByTestId(TEST_ID);

    const mockGoBack = jest.spyOn(NavigationService, 'goBack');

    await act(() => {
      fireEvent.press(button);
    });

    expect(mockGoBack).toHaveBeenCalledTimes(1);
  });
});
