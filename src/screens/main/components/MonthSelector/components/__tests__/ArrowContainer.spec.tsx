import { fireEvent, render } from '@testing-library/react-native';
import * as React from 'react';

import { ArrowContainer } from '../ArrowContainer';

describe('ArrowContainer component', () => {
  const testID = 'ArrowContainerComponentTestID';
  const onArrowIconPressFn = jest.fn();

  const getRenderedComponent = () => render(<ArrowContainer onArrowIconPress={onArrowIconPressFn} />);

  it(`should render ArrowContainer component correctly`, () => {
    const renderer = getRenderedComponent();
    const renderTree = renderer.toJSON();
    expect(renderTree).toMatchSnapshot();
  });

  it('should find the ArrowContainer component via testID', () => {
    const { getByTestId } = getRenderedComponent();
    const foundScreen = getByTestId(testID);
    expect(foundScreen).toBeTruthy();
  });

  it('should call onArrowIconPress function', () => {
    const { getByTestId } = getRenderedComponent();
    fireEvent.press(getByTestId(testID));
    expect(onArrowIconPressFn).toHaveBeenCalled();
  });
});
