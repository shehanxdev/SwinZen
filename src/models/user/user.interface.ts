export interface UserData {
  name?: string;
  email?: string;
  username?: string;
  profilePicture?: string;
  gender?: string;
  city?: string;
  deviceId?: string;
  isActive?: boolean;
  fcmTokens?: Array<string>;
}

export interface UserResponse {
  id: string;
  name: string;
  email: string;
  username: string;
  fcmTokens: Array<string>;
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
