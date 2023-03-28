import { AuthApiErrorResponses, AuthApiResponses, LoginErrorResponse, LoginResponse, LoginUserData } from '@sz/models';
import { HttpServiceInstance } from '@sz/services';

export class AuthService {
  static async login(data: LoginUserData) {
    const httpServiceInstance = HttpServiceInstance.getHttpServiceInstance();

    try {
      const response = await httpServiceInstance.postAnonymous<
        AuthApiResponses<LoginResponse>,
        AuthApiErrorResponses<LoginErrorResponse>
      >('/api/v1/auth/sign-in', data);

      console.log(response);
    } catch (error) {
      console.error('Error response', error, JSON.stringify(error));
      throw error;
    }
  }
}
