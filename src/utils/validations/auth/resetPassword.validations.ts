import * as yup from 'yup';

export const resetPasswordErrorMessages = {
  'password:required': 'Please enter New password',
  'password:min': 'Password must be between 8 and 20 characters length',
  'password:max': 'Password must be between 8 and 20 characters length',

  'confirmPassword:required': 'Please enter Password confirmation',
  'confirmPassword:match': 'Your passwords do not match',
};

export const resetPasswordValidationSchema = yup
  .object({
    password: yup
      .string()
      .required(resetPasswordErrorMessages['password:required'])
      .min(8, resetPasswordErrorMessages['password:min'])
      .max(20, resetPasswordErrorMessages['password:max']),
    confirmPassword: yup
      .string()
      .required(resetPasswordErrorMessages['confirmPassword:required'])
      .oneOf([yup.ref('password')], resetPasswordErrorMessages['confirmPassword:match']),
  })
  .required();
