export enum OtpType {
  VERIFICATION = 'VERIFICATION',
  FORGOT_PASSWORD = 'FORGOT_PASSWORD',
}

export const DEFAULT_OTP_RESEND_TIMER_MINUTES = 5; //TODO::as for the requirements this values should be 1 minute. But the current BE has configured to have 5 minutes.
export const DEFAULT_OTP_RESEND_TIMER_SECONDS = 0;
