import * as yup from 'yup';

import { ValidPasswordRegex } from '@sz/constants';

export const resetPasswordValidationSchema = yup
  .object({
    password: yup
      .string()
      .required('Please enter New password')
      .min(8, 'Password must be at least 8 letters long')
      .max(20, 'Password must not be 20 letters long')
      .matches(
        ValidPasswordRegex,
        'Your password does not meet our password rules, Password must contain at least one Uppercase letter, Lowercase letter, Numeric character and Special character',
      ),
    confirmPassword: yup
      .string()
      .required('Please enter Password confirmation')
      .oneOf([yup.ref('password')], 'Your passwords do not match'),
  })
  .required();
