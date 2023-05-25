import { ApiErrorResponse, ApiResponse, ContactUsResponse } from '@sz/models';

import { APIError, HttpServiceInstance } from '../../http-service';

export abstract class ContactUsService {
  static async postMessage(userId: string) {
    const httpServiceInstance = HttpServiceInstance.getHttpServiceInstance();
    try {
      const response = await httpServiceInstance.post<ApiResponse<ContactUsResponse>, ApiErrorResponse>(
        `users/${userId}/messages`,
      );
      console.log(response);
      if (!response) {
        throw new APIError('UNKNOWN_ERROR');
      }
      return response.data;
    } catch (error) {}
  }
}
