import * as yup from 'yup';

import { DEFAULT_TEXTFIELD_MAX_LENGTH, PASSWORD_MIN_LENGTH } from '@sz/constants';

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
      .max(DEFAULT_TEXTFIELD_MAX_LENGTH, loginErrorMessages['username:max']),
    password: yup
      .string()
      .required(loginErrorMessages['password:required'])
      .min(PASSWORD_MIN_LENGTH, loginErrorMessages['password:min'])
      .max(DEFAULT_TEXTFIELD_MAX_LENGTH, loginErrorMessages['password:max']),
  })
  .required();
