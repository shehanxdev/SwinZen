import * as yup from 'yup';

import { ValidPasswordRegex } from '@sz/constants';

export const signupFormErrorMessages = {
  'name:required': 'Please enter Name',
  'name:min': 'Username must be at least 2 letters long',
  'name:max': 'Username must not be 10 letters long',

  'username:required': 'Please enter Email ID',
  'username:email': 'Invalid Email',
  'username:max': 'Email must not be 50 letters long',

  'password:required': 'Please enter Password',
  'password:min': 'Password must be at least 8 letters long',
  'password:max': 'Password must not be 20 letters long',
  'password:matches':
    'Password must contain at least one Uppercase letter, Lowercase letter, Numeric character and Special character',

  'confirmpassword:required': 'Please confirm Password',
  'confirmpassword:match': 'Your passwords do not match',
};

export const signupValidationSchema = yup
  .object({
    name: yup
      .string()
      .trim()
      .required(signupFormErrorMessages['name:required'])
      .min(2, signupFormErrorMessages['name:min'])
      .max(10, signupFormErrorMessages['name:max']),
    username: yup
      .string()
      .required(signupFormErrorMessages['username:required'])
      .email(signupFormErrorMessages['username:email'])
      .max(50, signupFormErrorMessages['username:max']),
    password: yup
      .string()
      .required(signupFormErrorMessages['password:required'])
      .min(8, signupFormErrorMessages['password:min'])
      .max(20, signupFormErrorMessages['password:max'])
      .matches(ValidPasswordRegex, signupFormErrorMessages['password:matches']),
    confirmPassword: yup
      .string()
      .required(signupFormErrorMessages['confirmpassword:required'])
      .oneOf([yup.ref('password')], signupFormErrorMessages['confirmpassword:match']),
    promoCode: yup.string(),
  })
  .required();
