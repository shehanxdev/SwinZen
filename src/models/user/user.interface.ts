export interface UserData {
  name?: string;
  email?: string;
  username?: string;
  profilePicture?: string;
  gender?: string;
  city?: string;
  deviceId?: string;
  userStatus?: string;
  fcmTokens?: Array<string>;
}

export interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  fcmTokens: Array<string>;
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
