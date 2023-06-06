import { User } from '@sz/models';

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
