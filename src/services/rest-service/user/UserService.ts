import { ApiErrorResponse, ApiResponse, DecodedJWTUserData, User, UserData } from '@sz/models';

import { APIError, HttpServiceInstance } from '../..//http-service';
import { JTWDecodeService } from '../../jwt-decode-service';

export class UserService {
  static async getUserData(token: string) {
    const httpServiceInstance = HttpServiceInstance.getHttpServiceInstance();

    try {
      const userId = JTWDecodeService.decodeToken<DecodedJWTUserData>(token).sub;
      const response = await httpServiceInstance.get<ApiResponse<User>, ApiErrorResponse>(`/users/${userId}`);

      if (!response?.data) {
        throw new APIError('UNKNOWN_ERROR');
      }

      return response.data;
    } catch (error) {
      console.error('Error response', error, JSON.stringify(error));
      throw new APIError('CLIENT_ERROR');
    }
  }

  static async patchUserData(data: UserData, token: string) {
    const httpServiceInstance = HttpServiceInstance.getHttpServiceInstance();

    try {
      const userId = JTWDecodeService.decodeToken<DecodedJWTUserData>(token).sub;
      const response = await httpServiceInstance.patch<ApiResponse<User>, ApiErrorResponse>(`/users/${userId}`, data);

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