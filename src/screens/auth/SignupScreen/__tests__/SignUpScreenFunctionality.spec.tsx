import { fireEvent, render, waitFor } from '@testing-library/react-native';
import React from 'react';

import { SignupScreen } from '../SignupScreen';

describe('Sign Up Screen', () => {
  const getrenderedScreen = () => render(<SignupScreen />);

  beforeEach(() => {
    jest.useFakeTimers();
  });
  it('should render the component without errors', async () => {
    const { getByTestId } = getrenderedScreen();
    expect(getByTestId('SignupScreenTestID')).toBeTruthy();
  });
  it('should show error message for empty name field', async () => {
    const { getByText } = getrenderedScreen();
    const nameInput = getByText('Your Name');
    fireEvent(nameInput, 'onChangeText', '');
    fireEvent(nameInput, 'blur');

    await waitFor(() => {
      expect(getByText('Please enter Name')).toBeTruthy();
    });
  });

  it('should show error message for name field with less than 2 letters', async () => {
    const { getByText } = getrenderedScreen();
    const nameInput = getByText('Your Name');
    fireEvent(nameInput, 'onChangeText', 'a');
    fireEvent(nameInput, 'blur');

    await waitFor(() => {
      expect(getByText('Username must be at least 2 letters long')).toBeTruthy();
    });
  });
  it('should show error message for name field with more than 10 letters', async () => {
    const { getByText } = getrenderedScreen();
    const nameInput = getByText('Your Name');
    fireEvent(nameInput, 'onChangeText', 'abcdefghijklm');
    fireEvent(nameInput, 'blur');

    await waitFor(() => {
      expect(getByText('Username must not be 10 letters long')).toBeTruthy();
    });
  });

  it('should show error message for invalid email', async () => {
    const { getByText } = getrenderedScreen();
    const emailInput = getByText('Your Email');
    fireEvent(emailInput, 'onChangeText', 'invalidemail');
    fireEvent(emailInput, 'blur');
    await waitFor(() => {
      expect(getByText('Invalid Email')).toBeDefined();
    });
  });
  it('should show error message for empty email', async () => {
    const { getByText } = getrenderedScreen();
    const emailInput = getByText('Your Email');
    fireEvent(emailInput, 'onChangeText', '');
    fireEvent(emailInput, 'blur');
    await waitFor(() => {
      expect(getByText('Please enter Email ID')).toBeDefined();
    });
  });
  it('should show error message for email with more than 50 letters', async () => {
    const { getByText } = getrenderedScreen();
    const emailInput = getByText('Your Email');
    fireEvent(
      emailInput,
      'onChangeText',
      'johnwith_more_than_fifty_characters_aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa@example.com',
    );
    fireEvent(emailInput, 'blur');
    await waitFor(() => {
      expect(getByText('Email must not be 50 letters long')).toBeDefined();
    });
  });
  it('should show error message for weak password input', async () => {
    const { getByText } = getrenderedScreen();
    const passwordInput = getByText('Your Password');
    fireEvent(passwordInput, 'onChangeText', 'weak');
    fireEvent(passwordInput, 'blur');
    await waitFor(() => {
      expect(getByText('Password must be at least 8 letters long')).toBeDefined();
    });
  });
  it('should show error message for password with more than 20 characters', async () => {
    const { getByText } = getrenderedScreen();
    const passwordInput = getByText('Your Password');
    fireEvent(passwordInput, 'onChangeText', 'password_with_more_than_twenty_character_is_not_allowed');
    fireEvent(passwordInput, 'blur');
    await waitFor(() => {
      expect(getByText('Password must not be 20 letters long')).toBeDefined();
    });
  });
  it('should show error message for invalid password ', async () => {
    const { getByText } = getrenderedScreen();
    const passwordInput = getByText('Your Password');
    fireEvent(passwordInput, 'onChangeText', 'invalidpassword');
    fireEvent(passwordInput, 'blur');
    await waitFor(() => {
      expect(
        getByText(
          'Password must contain at least one Uppercase letter, Lowercase letter, Numeric character and Special character',
        ),
      ).toBeDefined();
    });
  });
  it('should show error message for invalid confirm password', async () => {
    const { getByText } = getrenderedScreen();
    const passwordInput = getByText('Your Password');
    const confirmPasswordInput = getByText('Please Confirm Your Password');
    fireEvent(passwordInput, 'onChangeText', 'Password!1');
    fireEvent(confirmPasswordInput, 'onChangeText', 'Passw');
    fireEvent(confirmPasswordInput, 'blur');
    await waitFor(() => {
      expect(getByText('Your passwords do not match')).toBeDefined();
    });
  });
});
//