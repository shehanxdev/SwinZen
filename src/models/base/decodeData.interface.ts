export interface DecodedJWTUserData {
  username: string;
  sub: string;
  iat: number;
  exp: number;
}
