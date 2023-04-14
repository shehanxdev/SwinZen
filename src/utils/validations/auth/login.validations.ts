import * as yup from 'yup';

import { ValidPasswordRegex } from '@sz/constants';

export const loginErrorMessages = {
  'username:required': 'Please enter Email ID',
  'username:invalid': 'Invalid Email',
  'username:max': 'Email must not be 50 letters long',
  'password:required': 'Please enter Password',
  'password:min': 'Password must be at least 8 letters long',
  'password:max': 'Password must not be 20 letters long',
  'password:match':
    'Password must contain at least one Uppercase letter, Lowercase letter, Numeric character and Special character',
};

export const loginValidationSchema = yup
  .object({
    username: yup
      .string()
      .required('Please enter Email ID')
      .email('Invalid Email')
      .max(50, 'Email must not be 50 letters long'),
    password: yup
      .string()
      .required('Please enter Password')
      .min(8, 'Password must be at least 8 letters long')
      .max(20, 'Password must not be 20 letters long')
      .matches(
        ValidPasswordRegex,
        'Password must contain at least one Uppercase letter, Lowercase letter, Numeric character and Special character',
      ),
  })
  .required();
