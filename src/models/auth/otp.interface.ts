import { OtpType } from '@sz/constants';

/*
 * NOTE:These types are being shared between registeration and forget password flows since it's the default BE behaviour \
 * api/v1/auth/resend-otp
 */
export interface OtpVerficationValue {
  otp: string;
}

export interface ResendOtpData {
  otpType: OtpType;
  username: string;
}

export interface ResendOtpResponse {
  nextActionToken: string;
}
