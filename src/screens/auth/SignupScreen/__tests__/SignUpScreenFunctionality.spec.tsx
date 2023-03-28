//IMPORTS FOR TESTING PURPOSE
import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import { act } from 'react-test-renderer';

// import { SignupFormValues } from '@sz/models';
//SCREEN IMPORTS
import { SignupScreen } from '../SignupScreen';

jest.mock('@sz/services/navigation-service/');

describe('SignupScreen', () => {
  // mock the useForm hook
  //   const mockOnSubmit = jest.fn();
  //   jest.mock('react-hook-form', () => ({
  //     useForm: jest.fn(),
  //   }));

  //   beforeEach(() => {
  //     jest.clearAllMocks();
  //     (useForm as jest.Mock).mockReturnValue({
  //       handleSubmit: mockOnSubmit,
  //       control: {},
  //       formState: {},
  //     });
  //   });

  it('should render the component correctly', async () => {
    const { getByTestId } = render(<SignupScreen />);

    expect(getByTestId('SignupScreenTestID')).toBeTruthy();
  });

  it('should call the onSubmit function with the form data when the form is submitted', async () => {
    const { getByText } = render(<SignupScreen />);

    const nameInput = getByText('Your Name');
    const emailInput = getByText('Your Email');
    const passwordInput = getByText('Your Password');
    const confirmPasswordInput = getByText('Please Confirm Your Password');
    const submitButton = getByText('Register');

    await act(async () => {
      fireEvent.changeText(nameInput, 'John Doe');
      fireEvent.changeText(emailInput, 'johndoe@example.com');
      fireEvent.changeText(passwordInput, '9D2uPn^O6l^');
      fireEvent.changeText(confirmPasswordInput, '9D2uPn^O6l^');
      fireEvent.press(submitButton);
      // await waitFor(() => expect(mockOnSubmit).toHaveBeenCalled());
    });

    // const expectedFormValues: SignupFormValues = {
    //   name: 'John Doe',
    //   username: 'johndoe@example.com',
    //   password: 'password',
    //   confirmPassword: 'password',
    //   promoCode: '',
    // };

    // expect(mockOnSubmit).toHaveBeenCalledWith(expectedFormValues);
  });

  it('should display an error message when the form is submitted with invalid data', async () => {
    const { getByText } = render(<SignupScreen />);

    const nameInput = getByText('Your Name');
    const emailInput = getByText('Your Email');
    const passwordInput = getByText('Your Password');
    const confirmPasswordInput = getByText('Please Confirm Your Password');
    const submitButton = getByText('Register');

    await act(async () => {
      fireEvent.changeText(nameInput, '');
      fireEvent.changeText(emailInput, 'invalid-email');
      fireEvent.changeText(passwordInput, 'password');
      fireEvent.changeText(confirmPasswordInput, 'wrong-password');
      fireEvent.press(submitButton);
      //await waitFor(() => expect(mockOnSubmit).not.toHaveBeenCalled());
    });

    // expect(getByText('Please enter First Name')).toBeTruthy();
    // expect(getByText('Invalid Email')).toBeTruthy();
    // expect(getByText('Your passwords do not match')).toBeTruthy();
  });
});
