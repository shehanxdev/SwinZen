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
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  retryAttempts: number;
  profilePicture: string;
  gender: string;
  city: string;
  isActive: boolean;
  lastLogin: string;
  deviceId: string;
  createdAt: string;
  updatedAt: string;
}
