import { ApiErrorResponse, ApiResponse, LoginErrorResponse, LoginResponse, LoginUserData } from '@sz/models';

import { APIError, HttpServiceInstance } from './../../http-service';

export class AuthService {
  static async loginUserWithCredentials(data: LoginUserData) {
    const httpServiceInstance = HttpServiceInstance.getHttpServiceInstance();

    try {
      const response = await httpServiceInstance.postAnonymous<
        ApiResponse<LoginResponse>,
        ApiErrorResponse<LoginErrorResponse>
      >('/auth/sign-in', data);

      if (!response?.data) {
        throw new APIError('UNKNOWN_ERROR');
      }

      return response.data;
    } catch (error) {
      console.error('Error response', error, JSON.stringify(error));
    }
  }
}
