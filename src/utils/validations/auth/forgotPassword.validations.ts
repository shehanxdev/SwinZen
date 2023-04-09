import * as yup from 'yup';

export const forgotPasswordValidationSchema = yup
  .object({
    email: yup
      .string()
      .required('Please enter Email ID')
      .email('Invalid Email ID')
      .max(50, 'Email must not be 50 letters long'),
  })
  .required();
