import {
  ApiErrorResponse,
  ApiResponse,
  BaseRequestHeaders,
  ChangePasswordData,
  ChangePasswordRequestData,
  ChangePasswordResponse,
  DecodedJWTUserData,
} from '@sz/models';
import { APIError, HttpServiceInstance, JTWDecodeService } from '@sz/services';

export class AccountService {
  static async profileChangePassword(
    data: ChangePasswordData,
    headers: Pick<BaseRequestHeaders, 'x-auth' | 'authorization'>,
  ) {
    const { currentPassword, newPassword } = data;
    const httpServiceInstance = HttpServiceInstance.getHttpServiceInstance();

    const payload: ChangePasswordRequestData = {
      email: JTWDecodeService.decodeToken<DecodedJWTUserData>(headers['x-auth']).username,
      previousPassword: currentPassword,
      proposedPassword: newPassword,
    };

    try {
      const response = await httpServiceInstance.postAnonymousWithCustomHeaders<
        ApiResponse<ChangePasswordResponse>,
        ApiErrorResponse
      >('/auth/change-password', { ...headers }, payload);

      return response.data;
    } catch (error) {
      throw new APIError<ApiErrorResponse>('CLIENT_ERROR', error.data);
    }
  }
}
