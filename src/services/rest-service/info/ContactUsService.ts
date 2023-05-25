import { ApiErrorResponse, ApiResponse, ContactUsResponse } from '@sz/models';

import { APIError, HttpServiceInstance } from '../../http-service';

export class ContactUsService {
  static async postMessage(userId: string, formInput) {
    const httpServiceInstance = HttpServiceInstance.getHttpServiceInstance();

    try {
      const response = await httpServiceInstance.post<ApiResponse<ContactUsResponse>, ApiErrorResponse>(
        `users/${userId}/messages`,
        formInput,
      );
      console.log(formInput);

      if (!response) {
        throw new APIError('UNKNOWN_ERROR');
      }
      console.log(response);
      return response;
    } catch (error) {
      console.error(error.message);
    }
  }
}
