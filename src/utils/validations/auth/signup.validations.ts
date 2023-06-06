import * as yup from 'yup';

import { DEFAULT_TEXTFIELD_MAX_LENGTH, NAME_MIN_LENGTH, PASSWORD_MIN_LENGTH, ValidNameRegex } from '@sz/constants';

export const signupFormErrorMessages = {
  'name:required': 'Please enter Name',
  'name:min': 'Username must be at least 2 letters long',
  'name:max': 'Username must not be 256 letters long',
  'name:valid': 'The name cannot contain numerical and special characters',

  'username:required': 'Please enter Email ID',
  'username:email': 'Invalid Email',
  'username:max': 'Email must not be 256 letters long',

  'password:required': 'Please enter Password',
  'password:min': 'Please enter at least 8 characters',
  'password:max': 'Only 256 characters are allowed for the Password',

  'confirmPassword:required': 'Please confirm Password',
  'confirmPassword:match': 'Your passwords do not match',
};

export const signupValidationSchema = yup
  .object({
    name: yup
      .string()
      .trim()
      .required(signupFormErrorMessages['name:required'])
      .min(NAME_MIN_LENGTH, signupFormErrorMessages['name:min'])
      .max(DEFAULT_TEXTFIELD_MAX_LENGTH, signupFormErrorMessages['name:max'])
      .matches(ValidNameRegex, signupFormErrorMessages['name:valid']),
    username: yup
      .string()
      .required(signupFormErrorMessages['username:required'])
      .email(signupFormErrorMessages['username:email'])
      .max(DEFAULT_TEXTFIELD_MAX_LENGTH, signupFormErrorMessages['username:max']),
    password: yup
      .string()
      .required(signupFormErrorMessages['password:required'])
      .min(PASSWORD_MIN_LENGTH, signupFormErrorMessages['password:min'])
      .max(DEFAULT_TEXTFIELD_MAX_LENGTH, signupFormErrorMessages['password:max']),
    confirmPassword: yup
      .string()
      .required(signupFormErrorMessages['confirmPassword:required'])
      .oneOf([yup.ref('password')], signupFormErrorMessages['confirmPassword:match']),
    promoCode: yup.string(),
  })
  .required();
