import {
  ApiErrorResponse,
  ApiResponse,
  DecodedJWTUserData,
  Notification,
  NotificationData,
  NotificationResponse,
  NotificationsQueryData,
} from '@sz/models';
import { APIError, HttpServiceInstance, JTWDecodeService } from '@sz/services';

export class NotificationsService {
  static async getUserNotifications(data: NotificationsQueryData, token: string) {
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
      console.error('Error response is get NOTIFICATIONS', error, JSON.stringify(error));
      throw new APIError('CLIENT_ERROR');
    }
  }

  static async patchUserNotification(data: Notification, token: string) {
    const httpServiceInstance = HttpServiceInstance.getHttpServiceInstance();

    try {
      const notificationData: NotificationData = {
        notificationType: data.notificationType,
        payload: data.payload,
        title: data.title,
        isRead: data.isRead,
      };
      const userId = JTWDecodeService.decodeToken<DecodedJWTUserData>(token).sub;
      const response = await httpServiceInstance.patch<ApiResponse<Notification>, ApiErrorResponse>(
        `/users/${userId}/notifications/${data.id}`,
        notificationData,
      );

      if (!response?.data) {
        throw new APIError('UNKNOWN_ERROR');
      }

      return response.data;
    } catch (error) {
      console.error('Error response in update NOTIFICATION', error, JSON.stringify(error));
      throw new APIError('CLIENT_ERROR');
    }
  }
}
