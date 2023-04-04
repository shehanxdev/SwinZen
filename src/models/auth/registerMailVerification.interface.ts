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

export interface RegisterMailVerificationResponse {
  data: Response;
}

export interface Response {}

export interface RegisterMailVerificationErrorResponse {
  error: string;
}
