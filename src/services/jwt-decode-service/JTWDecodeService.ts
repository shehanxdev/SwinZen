import jwt_decode, { InvalidTokenError, JwtDecodeOptions } from 'jwt-decode';

export abstract class JTWDecodeService {
  /* Decode JWT token and returns decoded data */
  public static decodeToken<T>(token: string, options?: JwtDecodeOptions): T {
    try {
      return jwt_decode(token, options);
    } catch (e) {
      throw new InvalidTokenError(e);
    }
  }
}
