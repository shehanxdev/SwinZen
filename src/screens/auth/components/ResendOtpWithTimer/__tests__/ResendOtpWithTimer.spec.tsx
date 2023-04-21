import { fireEvent, render } from '@testing-library/react-native';
import * as React from 'react';

import { ResendOtpWithTimerProps } from '..';
import { ResendOtpWithTimer } from '../ResendOtpWithTimer.component';

describe('ResendOtpWithTimer Component', () => {
  const mockOnResendFunction = jest.fn();
  const linkDefaultText = 'Resend the code';
  const testID = 'ResendOtpWithTimerTestID';

  const getRenderedComponent = (props?: Partial<ResendOtpWithTimerProps>) =>
    render(<ResendOtpWithTimer {...props} onResend={mockOnResendFunction} testID={testID} />);

  it('should find the component via testID', () => {
    const { getByTestId } = getRenderedComponent();
    const foundComponent = getByTestId(testID);

    expect(foundComponent).toBeTruthy();
  });

  it('should render correctly', () => {
    const rendered = getRenderedComponent();
    const renderedTree = rendered.toJSON();

    expect(renderedTree).toMatchSnapshot();
  });

  it('should display "Resend the code" instead of the remaining timer when the time expired', () => {
    const { getByText } = getRenderedComponent({ initialSeconds: 0, initialMinutes: 0 });
    const foundTextElement = getByText(linkDefaultText);

    expect(foundTextElement).toBeTruthy();
  });

  it('should not display "Resend the code" instead it should show the remaining timer when the timer is running', () => {
    const lintText = 'Resend again in 05:30';
    const { getByTestId } = getRenderedComponent({ initialMinutes: 5, initialSeconds: 30 });
    const foundComponent = getByTestId(testID);

    expect(foundComponent.props.children).toBe(lintText);
  });

  it('should call resend function on link press', () => {
    const { getByTestId } = getRenderedComponent();

    fireEvent.press(getByTestId(testID));
    expect(mockOnResendFunction).toHaveBeenCalled();
  });
});
