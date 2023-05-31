import {
  ApiErrorResponse,
  ApiResponse,
  ContactUsFormValues,
  ContactUsResponse,
  DecodedJWTUserData,
} from '../../../models';
import { APIError, HttpServiceInstance } from '../../http-service';
import { JTWDecodeService } from '../../jwt-decode-service';

export class ContactUsService {
  static async postMessage(payload: ContactUsFormValues, accessToken: string) {
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
