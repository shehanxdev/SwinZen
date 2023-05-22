import { OtpType } from '@sz/constants';

/*
 * NOTE:These types are being shared between registeration and forget password flows since it's the default BE behaviour
 * api/v1/auth/verify-otp
 */
export interface EmailVerificationData {
  otpType: OtpType;
  otp: string;
}

export interface EmailVerificationResponse {
  nextActionToken?: string;
}
