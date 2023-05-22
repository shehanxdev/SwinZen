import * as yup from 'yup';

import { InputFieldConstraints } from '@sz/constants';

export const resetPasswordErrorMessages = {
  'password:required': 'Please enter New password',
  'password:min': 'Please enter at least 8 characters',
  'password:max': 'Only 256 characters are allowed for the Password',

  'confirmPassword:required': 'Please enter Password confirmation',
  'confirmPassword:match': 'Your passwords do not match',
};

export const resetPasswordValidationSchema = yup
  .object({
    password: yup
      .string()
      .required(resetPasswordErrorMessages['password:required'])
      .min(InputFieldConstraints.passwordMinLength, resetPasswordErrorMessages['password:min'])
      .max(InputFieldConstraints.passwordMaxLength, resetPasswordErrorMessages['password:max']),
    confirmPassword: yup
      .string()
      .required(resetPasswordErrorMessages['confirmPassword:required'])
      .oneOf([yup.ref('password')], resetPasswordErrorMessages['confirmPassword:match']),
  })
  .required();
