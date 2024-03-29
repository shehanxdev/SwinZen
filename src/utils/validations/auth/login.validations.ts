import * as yup from 'yup';

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
      .max(256, loginErrorMessages['username:max']),
    password: yup
      .string()
      .required(loginErrorMessages['password:required'])
      .min(8, loginErrorMessages['password:min'])
      .max(256, loginErrorMessages['password:max']),
  })
  .required();
