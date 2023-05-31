import { fireEvent, render } from '@testing-library/react-native';
import * as React from 'react';

import { ToggleSwitch } from '../ToggleSwitch';

describe('ToggleSwitch Component', () => {
  const testID = 'ToggleSwitchTestID';
  const onChangeMock = jest.fn();

  const options = [
    { label: 'Option 1', value: 'option1', testID: 'switchSelector' },
    { label: 'Option 2', value: 'option2', testID: 'switchSelector' },
  ];

  const getRenderedComponent = () => render(<ToggleSwitch options={options} onChange={onChangeMock} testID={testID} />);
  it(`should render ToggleSwitch component correctly`, () => {
    const rendered = getRenderedComponent();
    const renderedTree = rendered.toJSON();
    expect(renderedTree).toMatchSnapshot();
  });

  it(`should find the ToggleSwitch component via testID`, () => {
    const { getByTestId } = getRenderedComponent();
    const foundCustomHeaderComponent = getByTestId(testID);
    expect(foundCustomHeaderComponent).toBeTruthy();
  });

  it('displays the correct number of options', () => {
    const { getAllByTestId } = getRenderedComponent();
    const optionElements = getAllByTestId('switchSelector');
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
