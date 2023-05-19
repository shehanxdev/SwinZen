export interface SignupFormValues {
  name: string;
  username: string;
  password: string;
  confirmPassword: string;
  promoCode: string;
}

export interface SignupUserData {
  name: string;
  username: string;
  password: string;
  promoCode: string;
}

export interface SignupResponse {
  user: User;
  nextActionToken: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  fcmTokens: any[]; //TODO::update the type after sync with the BE
  retryAttempts: number;
  profilePicture: string | null;
  gender: string | null;
  city: string | null;
  userStatus: string;
  lastLogin: string | null;
  deviceId: string | null;
  createdAt: string;
  updatedAt: string;
}
