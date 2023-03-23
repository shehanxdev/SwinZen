import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';

import { Color } from '@sz/constants';

import { TextFieldProps } from '../TextField.types';
import { TextField } from './../TextField.component';

describe('TextField Component', () => {
  let value = '';
  const testID = 'TEST_ID';
  const mockOnChangeFunction = jest.fn();

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const otherProps: TextFieldProps = {
    defaultValue: 'Default value',
    helperText: 'Helper text',
    label: 'Label',
    onChangeText: v => {
      mockOnChangeFunction();
      value = v;
    },
    textColor: Color.Neutral.Sz200,
    disabledColor: Color.Neutral.Sz100,
    labelColor: Color.Tertiary.Sz200,
    helperTextColor: Color.Tertiary.Sz300,
  };

  const getRenderedTextFieldComponent = (props?: Partial<TextFieldProps>) =>
    render(
      <TextField
        {...props}
        testID={testID}
        defaultValue={otherProps.defaultValue}
        helperText={otherProps.helperText}
        onChangeText={otherProps.onChangeText}
      />,
    );

  test(`should render correctly`, () => {
    const rendered = getRenderedTextFieldComponent();
    const renderedTree = rendered.toJSON();
    expect(renderedTree).toMatchSnapshot();
  });

  test('should allow to change text in the TextInput', () => {
    const { getByTestId } = getRenderedTextFieldComponent();
    const foundTextField = getByTestId(testID);

    const text = (Math.random() + 1).toString(36).substring(7);

    fireEvent.changeText(foundTextField, text);
    expect(foundTextField.props.value).toBe(text);
  });

  test('should allow text to be deleted', () => {
    const { getByTestId } = getRenderedTextFieldComponent();
    const foundTextField = getByTestId(testID);

    const text = (Math.random() + 1).toString(36).substring(7);

    fireEvent.changeText(foundTextField, text);
    expect(foundTextField.props.value).toBe(text);

    fireEvent.changeText(foundTextField, '');
    expect(foundTextField.props.value).toBe('');
  });

  test('should execute onChangeText when user change text', () => {
    const { getByTestId } = getRenderedTextFieldComponent();
    const foundTextField = getByTestId(testID);

    const text = (Math.random() + 1).toString(36).substring(7);

    fireEvent.changeText(foundTextField, text);
    expect(mockOnChangeFunction).toHaveBeenCalled();
    expect(foundTextField.props.value).toBe(value);
  });
});
