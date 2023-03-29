export interface LoginFormValues {
  username: string;
  password: string;
}

export interface LoginUserData {
  username: string;
  password: string;
}

export interface LoginRequestData {
  username: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  expiresIn: number;
  refreshExpiresIn: number;
  refreshToken: string;
}

//TODO::create a common error response rather than having domain specific errors if it's possible after sync with the back end devs
export interface LoginErrorResponse {
  error: string;
}
