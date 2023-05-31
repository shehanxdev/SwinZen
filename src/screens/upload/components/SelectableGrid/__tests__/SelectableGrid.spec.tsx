import { fireEvent, render } from '@testing-library/react-native';
import * as React from 'react';

import { SelectableGrid } from '../SelectableGrid';

describe('SelectableGrid Component', () => {
  const testID = 'SelectableGridTestID';
  const onChangeMock = jest.fn();
  const options = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
  ];

  const getRenderedComponent = () =>
    render(<SelectableGrid options={options} onChange={onChangeMock} testID={testID} />);

  it(`should render SelectableGrid component correctly`, () => {
    const rendered = getRenderedComponent();
    const renderedTree = rendered.toJSON();
    expect(renderedTree).toMatchSnapshot();
  });

  it(`should find the SelectableGrid component via testID`, () => {
    const { getByTestId } = getRenderedComponent();
    const foundCustomHeaderComponent = getByTestId(testID);
    expect(foundCustomHeaderComponent).toBeTruthy();
  });

  it('displays the correct number of options', () => {
    const { getAllByTestId } = getRenderedComponent();
    const optionElements = getAllByTestId('grid-option');
    expect(optionElements.length).toBe(options.length);
  });

  it('calls the onChange function with the selected value', () => {
    const { getByText } = getRenderedComponent();
    const optionElement = getByText('Option 2');

    fireEvent.press(optionElement);

    expect(onChangeMock).toHaveBeenCalledTimes(1);
    expect(onChangeMock).toHaveBeenCalledWith('option2');
  });
});
