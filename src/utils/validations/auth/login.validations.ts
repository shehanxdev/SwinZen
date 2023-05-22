import * as yup from 'yup';

import { InputFieldConstraints } from '@sz/constants';

export const loginErrorMessages = {
  'username:required': 'Please enter Email ID',
  'username:invalid': 'Invalid Email',
  'username:max': 'Email must not be 256 letters long',

  'password:required': 'Please enter Password',
  'password:min': 'Password must be between 8 and 256 characters length',
  'password:max': 'Password must be between 8 and 256 characters length',
};

export const loginValidationSchema = yup
  .object({
    username: yup
      .string()
      .required(loginErrorMessages['username:required'])
      .email(loginErrorMessages['username:invalid'])
      .max(InputFieldConstraints.emailMaxLength, loginErrorMessages['username:max']),
    password: yup
      .string()
      .required(loginErrorMessages['password:required'])
      .min(InputFieldConstraints.passwordMinLength, loginErrorMessages['password:min'])
      .max(InputFieldConstraints.passwordMaxLength, loginErrorMessages['password:max']),
  })
  .required();
