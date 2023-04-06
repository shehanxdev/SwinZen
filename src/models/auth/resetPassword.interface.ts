export interface ResetPasswordFormValues {
  password: string;
  confirmPassword: string;
}

export interface ResetPasswordRequestData {
  email: string;
  password: string;
}

export interface ResetPasswordData {
  email: string;
  password: string;
  headers: {};
}

export interface ResetPasswordResponse {}
