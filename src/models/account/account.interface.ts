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

export interface PreSignedResponse {
  url: string;
  fields: {
    key: string;
    fileName: string;
    bucket: string;
    'X-Amz-Algorithm': string;
    'X-Amz-Credential': string;
    'X-Amz-Date': string;
    Policy: string;
    'X-Amz-Signature': string;
    'Content-Type': string;
    file: string;
  };
}

export interface ChangeProfilePictureResponse {
  url: string;
}
