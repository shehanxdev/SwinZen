// eslint-disable-next-line import/no-extraneous-dependencies
import * as yup from 'yup';

export const schema = yup
  .object()
  .shape({
    username: yup
      .string()
      .trim()
      .required('Please enter First Name')
      .min(2, 'Username must be at least 2 letters long')
      .max(10, 'Username must not be 10 letters long'),
    email: yup
      .string()
      .required('Please enter Email ID')
      .email('Invalid Email')
      .max(50, 'Email must not be 50 letters long'),
    password: yup
      .string()
      .required('Please enter Password')
      .min(8, 'Username must be at least 8 letters long')
      .max(20, 'Username must not be 20 letters long')
      .matches(
        /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        'Password must contain at least one Uppercase letter, Lowercase letter, Numeric character and Special character',
      ),
    confirmPassword: yup
      .string()
      .required('Please confirm Password')
      .oneOf([yup.ref('password')], 'Your passwords do not match'),
    promoCode: yup.string(),
  })
  .required('Please enter your details');
