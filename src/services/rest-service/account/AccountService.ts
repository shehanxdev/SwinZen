import {
  ApiErrorResponse,
  ApiResponse,
  BaseRequestHeaders,
  ChangePasswordData,
  ChangePasswordRequestData,
  ChangePasswordResponse,
  DecodedJWTUserData,
  Notification,
  NotificationData,
  NotificationResponse,
  NotificationsQueryData,
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

  static async getNotifications(data: NotificationsQueryData, token: string) {
    const httpServiceInstance = HttpServiceInstance.getHttpServiceInstance();

    try {
      const userId = JTWDecodeService.decodeToken<DecodedJWTUserData>(token).sub;
      const response = await httpServiceInstance.get<ApiResponse<NotificationResponse>, ApiErrorResponse>(
        `/users/${userId}/notifications`,
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

  static async patchNotification(data: NotificationData, id: string, token: string) {
    const httpServiceInstance = HttpServiceInstance.getHttpServiceInstance();

    try {
      const userId = JTWDecodeService.decodeToken<DecodedJWTUserData>(token).sub;
      const response = await httpServiceInstance.patch<ApiResponse<Notification>, ApiErrorResponse>(
        `/users/${userId}/notifications/${id}`,
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
