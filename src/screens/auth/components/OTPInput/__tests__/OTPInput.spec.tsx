import { fireEvent, render } from '@testing-library/react-native';
import * as React from 'react';

import { OTPInput, OTPInputProps } from './../OTPInput';

describe('OTPInput Component', () => {
  const testID = 'OTPInputTestID';
  const OTP = '12345';
  const mockOnChangeFunction = jest.fn();
  const mockOnSubmitEditingFunction = jest.fn();

  const getRenderedOTPInputComponet = (props?: Partial<OTPInputProps>) =>
    render(
      <OTPInput
        {...props}
        value={OTP}
        onChangeValue={mockOnChangeFunction}
        onSubmitEditing={mockOnSubmitEditingFunction}
        testID={testID}
      />,
    );

  it(`should render correctly`, () => {
    const rendered = getRenderedOTPInputComponet();
    const renderedTree = rendered.toJSON();
    expect(renderedTree).toMatchSnapshot();
  });

  it('should find the component via testID', () => {
    const { getByTestId } = getRenderedOTPInputComponet();
    const foundOTPInputComponent = getByTestId(testID);
    expect(foundOTPInputComponent).toBeTruthy();
  });

  it('should execute onChangeValue when user input OTP', () => {
    const { getByTestId } = getRenderedOTPInputComponet();
    const OTPInput = getByTestId(testID);
    fireEvent.changeText(OTPInput, OTP);
    expect(mockOnChangeFunction).toHaveBeenCalled();
    expect(OTPInput.props.value).toBe(OTP);
  });
});
