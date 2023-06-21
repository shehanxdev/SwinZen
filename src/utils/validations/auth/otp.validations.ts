import * as yup from 'yup';

import { ValidOtpRegex } from '@sz/constants';

export const otpValidationErrorMessages = {
  'otp:required': 'Please enter the OTP received',
  'otp:match': 'Must be exactly 6 digits',
};

export const otpValidationSchema = yup
  .object({
    otp: yup.string().required('Please enter the OTP received').matches(ValidOtpRegex, 'Must be exactly 6 digits'),
  })
  .required();
