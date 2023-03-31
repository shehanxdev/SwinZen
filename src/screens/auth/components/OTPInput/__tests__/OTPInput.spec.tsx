import { fireEvent, render } from '@testing-library/react-native';
import * as React from 'react';

import { OTPInput, OTPInputProps } from './../OTPInput';

describe('OTPInput Component', () => {
  const testID = 'OTPInputTestID';
  const mockOnChangeFunction = jest.fn();

  const getRenderedOTPInputComponet = (props?: Partial<OTPInputProps>) =>
    render(<OTPInput {...props} onChangeValue={mockOnChangeFunction} testID={testID} />);

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
    const OTP = '12345';

    const OTPInput = getByTestId(testID);

    fireEvent.changeText(OTPInput, OTP);

    expect(mockOnChangeFunction).toHaveBeenCalled();
    expect(OTPInput.props.value).toBe(OTP);
  });
});
