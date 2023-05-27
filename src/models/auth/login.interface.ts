export interface LoginFormValues {
  username: string;
  password: string;
}

export interface LoginUserData {
  username: string;
  password: string;
}

export interface LoginResponse {
  userId: string;
  accessToken: string;
  expiresIn: number;
  refreshExpiresIn: number;
  refreshToken: string;
}
