import { ApiErrorResponse, ApiResponse, DecodedJWTUserData, UserData, UserResponse } from '@sz/models';
import { APIError, HttpServiceInstance, JTWDecodeService } from '@sz/services';
import { useSelector } from '@sz/stores';

export class UserService {
  static async patchUserData(data: UserData) {
    const httpServiceInstance = HttpServiceInstance.getHttpServiceInstance();

    const token = useSelector(state => state.userStore.accessToken);
    const userId = JTWDecodeService.decodeToken<DecodedJWTUserData>(token).sub;

    try {
      const response = await httpServiceInstance.patch<ApiResponse<UserResponse>, ApiErrorResponse>(
        `/users/${userId}`,
        data,
      );

      if (!response?.data) {
        throw new APIError('UNKNOWN_ERROR');
      }

      return response.data;
    } catch (error) {
      console.error('Error response', error, JSON.stringify(error));
      throw new APIError('CLIENT_ERROR');
    }
  }
}
