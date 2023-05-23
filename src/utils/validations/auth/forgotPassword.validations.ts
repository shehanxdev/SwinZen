import * as yup from 'yup';

import { DEFAULT_TEXTFIELD_MAX_LENGTH } from '@sz/constants';

export const forgotPasswordErrorMessages = {
  'email:required': 'Please enter Email ID',
  'email:invalid': 'Invalid Email ID',
  'email:max': 'Email must not be 256 letters long',
};

export const forgotPasswordValidationSchema = yup
  .object({
    email: yup
      .string()
      .required(forgotPasswordErrorMessages['email:required'])
      .email(forgotPasswordErrorMessages['email:invalid'])
      .max(DEFAULT_TEXTFIELD_MAX_LENGTH, forgotPasswordErrorMessages['email:max']),
  })
  .required();
