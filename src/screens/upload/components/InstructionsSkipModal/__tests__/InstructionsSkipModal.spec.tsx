import { render } from '@testing-library/react-native';
import * as React from 'react';

import { InstructionsSkipModal } from '../InstructionsSkipModal';

describe('InstructionsSkipModal Component', () => {
  const testID = 'InstructionsSkipModalTestID';
  const mockFn = jest.fn();

  const getRenderedComponent = () =>
    render(<InstructionsSkipModal testID={testID} showModal={false} handleModalClose={mockFn} onSkipped={mockFn} />);

  it(`should render InstructionsSkipModal component correctly`, () => {
    const rendered = getRenderedComponent();
    const renderedTree = rendered.toJSON();
    expect(renderedTree).toMatchSnapshot();
  });

  it(`should find the InstructionsSkipModal component via testID`, () => {
    const { getByTestId } = getRenderedComponent();
    const foundCustomHeaderComponent = getByTestId(testID);
    expect(foundCustomHeaderComponent).toBeTruthy();
  });
});
