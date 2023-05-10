export interface ChangePasswordFormValues {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface ChangePasswordRequestData {
  email: string;
  previousPassword: string;
  proposedPassword: string;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
}

export interface ChangePasswordResponse {
  accessToken: string;
  expiresIn: number;
  refreshExpiresIn: number;
  refreshToken: string;
}
