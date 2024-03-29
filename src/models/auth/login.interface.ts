export interface LoginFormValues {
  username: string;
  password: string;
}

export interface LoginUserData {
  username: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  expiresIn: number;
  refreshExpiresIn: number;
  refreshToken: string;
}
