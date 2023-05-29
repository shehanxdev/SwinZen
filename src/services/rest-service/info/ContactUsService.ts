import { ApiErrorResponse, ApiResponse, ContactUsPostValues, ContactUsResponse, DecodedJWTUserData } from '@sz/models';
import { JTWDecodeService } from '@sz/services';

import { APIError, HttpServiceInstance } from '../../http-service';

export class ContactUsService {
  static async postMessage(payload: ContactUsPostValues, accessToken: string) {
    const httpServiceInstance = HttpServiceInstance.getHttpServiceInstance();

    const userId = JTWDecodeService.decodeToken<DecodedJWTUserData>(accessToken).sub;

    try {
      const response = await httpServiceInstance.post<ApiResponse<ContactUsResponse>, ApiErrorResponse>(
        `users/${userId}/messages`,
        payload,
      );
      if (!response) {
        throw new APIError('UNKNOWN_ERROR');
      }

      return response;
    } catch (error) {
      return error;
    }
  }
}
