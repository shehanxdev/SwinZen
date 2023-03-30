import { render } from '@testing-library/react-native';
import React from 'react';

import { SignupScreen } from '../SignupScreen';

describe('Sign Up Screen', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  it('should render the component without errors', () => {
    const { getByTestId } = render(<SignupScreen />);
    expect(getByTestId('SignupScreenTestID')).toBeTruthy();
  });
  // it('should show error message for empty name field', async () => {
  //   const { getByTestId, getByText } = render(<SignupScreen />);
  //   const nameInput = getByText('Your Name');
  //   fireEvent(nameInput, 'onChangeText', 'Name');
  //   fireEvent(nameInput, 'onChangeText', '');
  //   fireEvent(getByTestId('SignupScreenTestID'), 'onSubmitEditing');
  //   await waitFor(() => {
  //     expect(getByText('Please enter Name')).toBeTruthy();
  //   });
  // });

  // it('should show error message for invalid email', async () => {
  //   const { getByTestId, getByPlaceholderText, getByText } = render(<SignupScreen />);
  //   const emailInput = getByText('Your Email');
  //   fireEvent(emailInput, 'onChangeText', 'invalidemail');

  //   expect(getByText('Invalid Email')).toBeDefined();
  // });
});
