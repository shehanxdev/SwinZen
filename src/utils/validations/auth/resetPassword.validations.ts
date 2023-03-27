import * as yup from 'yup';

import { ValidPasswordRegex } from '@sz/constants';

export const resetPasswordValidationSchema = yup
  .object({
    password: yup
      .string()
      .required('Please enter Password')
      .min(8, 'Password must be at least 8 letters long')
      .max(20, 'Password must not be 20 letters long')
      .matches(
        ValidPasswordRegex,
        'Password must contain at least one Uppercase letter, Lowercase letter, Numeric character and Special character',
      ),
    confirmPassword: yup
      .string()
      .required('Please confirm Password')
      .oneOf([yup.ref('password')], 'Your passwords do not match'),
  })
  .required();
