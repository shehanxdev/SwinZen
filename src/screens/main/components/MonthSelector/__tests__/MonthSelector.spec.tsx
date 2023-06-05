import { render } from '@testing-library/react-native';
import * as React from 'react';

import { MonthSelector } from '../MonthSelector';

describe('MonthSelector component', () => {
  const testID = 'MonthSelectorComponentTestID';

  const getRenderedComponent = () => render(<MonthSelector />);

  beforeEach(() => {
    jest.useFakeTimers().setSystemTime(new Date('2023-05-30'));
  });

  it(`should render MonthSelector component correctly`, () => {
    const renderer = getRenderedComponent();
    const renderTree = renderer.toJSON();
    expect(renderTree).toMatchSnapshot();
  });

  it('should find the MonthSelector component via testID', () => {
    const { getByTestId } = getRenderedComponent();
    const foundScreen = getByTestId(testID);
    expect(foundScreen).toBeTruthy();
  });
});
