import { OtpTypes } from '@sz/constants';

/*
 * NOTE:These types are being shared between registeration and forget password flows since it's the default BE behaviour
 * api/v1/auth/verify-otp
 */
export interface EmailVerificationData {
  username: string;
  otpType: OtpTypes;
  otp: string;
}

export interface EmailVerificationRequestData {
  username: string;
  otpType: OtpTypes;
  otp: string;
}

export interface EmailVerificationResponse {}
