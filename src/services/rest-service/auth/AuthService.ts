import { ApiErrorResponse, ApiResponse, LoginErrorResponse, LoginResponse, LoginUserData } from '@sz/models';
import { HttpServiceInstance } from '@sz/services';

export class AuthService {
  static async loginUserWithCredentials(data: LoginUserData) {
    const httpServiceInstance = HttpServiceInstance.getHttpServiceInstance();

    try {
      const response = await httpServiceInstance.postAnonymous<
        ApiResponse<LoginResponse>,
        ApiErrorResponse<LoginErrorResponse>
      >('/api/v1/auth/sign-in', data);

      console.log(response);
    } catch (error) {
      console.error('Error response', error, JSON.stringify(error));
      throw error;
    }
  }
}
