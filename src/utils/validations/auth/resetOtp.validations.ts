import * as yup from 'yup';

import { ValidOtpRegex } from '@sz/constants';

export const resetOtpValidationSchema = yup
  .object({
    otp: yup.string().required('Please enter otp').matches(ValidOtpRegex, 'Must be exactly 6 digits'),
  })
  .required();
