export interface ResendOtpData {
  username: string;
}

export interface ResendOtpRequestData {
  username: string;
}

export interface ResendOtpResponse {
  data: OtpResponse;
}

export interface OtpResponse {}

export interface ResendOtpErrorResponse {
  error: string;
}
