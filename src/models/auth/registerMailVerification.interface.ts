export interface OtpVerficationValue {
  otp: string;
}

export interface RegisterMailVerificationData {
  username: string;
  otpType: string;
  otp: string;
}

export interface RegisterMailVerificationRequestData {
  username: string;
  otpType: string;
  otp: string;
}

export interface RegisterMailVerificationResponse {}
