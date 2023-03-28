import * as yup from 'yup';

import { ValidPasswordRegex } from '@sz/constants';

export const signupValidationSchema = yup
  .object({
    name: yup
      .string()
      .trim()
      .required('Please enter Name')
      .min(2, 'Username must be at least 2 letters long')
      .max(10, 'Username must not be 10 letters long'),
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
    confirmPassword: yup
      .string()
      .required('Please confirm Password')
      .oneOf([yup.ref('password')], 'Your passwords do not match'),
    loginPassword: yup
      .string()
      .required('Please enter Password')
      .matches(
        /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        'Password must contain at least one Uppercase letter, Lowercase letter, Numeric character and Special character',
      ),
    promoCode: yup.string(),
  })
  .required();
