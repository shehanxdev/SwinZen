import { act } from '@testing-library/react-native';
import * as React from 'react';

import { HttpService, HttpServiceInstance } from '@sz/services';
import { renderWithProviders } from '@sz/utils';

import { PricePlansScreen } from '../PricePlansScreen';

describe('Price Plans Screen screen', () => {
  const testID = 'PricePlansScreenTestID';
  const mockRoute = { param: null };
  const getRenderedScreen = () => renderWithProviders(<PricePlansScreen route={mockRoute} />);

  act(() => {
    beforeAll(() => {
      const mockURL = 'https://example.com/api';
      const mockFunction = jest.fn();
      const httpServiceInstance = new HttpService(mockURL, mockFunction, mockFunction, mockFunction);
      HttpServiceInstance.setHttpServiceInstance(httpServiceInstance);
    });
  });

  it(`should render Price Plans Screen correctly`, async () => {
    const renderer = getRenderedScreen();
    const renderTree = renderer.toJSON();
    expect(renderTree).toMatchSnapshot();
  });

  it('should find the Price Plans Screen via testID', () => {
    const { getByTestId } = getRenderedScreen();
    const foundScreen = getByTestId(testID);
    expect(foundScreen).toBeDefined();
  });
});
