import { render } from '@testing-library/react-native';
import * as React from 'react';

import { CustomHeader } from './../CustomHeader';

describe('CustomHeader Component', () => {
  const testID = 'CustomHeaderTestID';
  const title = 'testTitle';
  const mockOnBackPressFunction = jest.fn();

  const getRenderedComponent = () =>
    render(<CustomHeader testID={testID} title={title} onBackPress={mockOnBackPressFunction} />);

  it(`should render CustomHeader component correctly`, () => {
    const rendered = getRenderedComponent();
    const renderedTree = rendered.toJSON();
    expect(renderedTree).toMatchSnapshot();
  });

  it('should find the CustomHeader component via testID', () => {
    const { getByTestId } = getRenderedComponent();
    const foundCustomHeaderComponent = getByTestId(testID);
    expect(foundCustomHeaderComponent).toBeTruthy();
  });
});
