import { ApiErrorResponse, ApiResponse, ContactUsResponse, DecodedJWTUserData, User } from '@sz/models';
import { JTWDecodeService } from '@sz/services';

import { APIError, HttpServiceInstance } from '../../http-service';

export class ContactUsService {
  static async postMessage(accessToken: string, formInput) {
    const httpServiceInstance = HttpServiceInstance.getHttpServiceInstance();
    /*NOTE:: trying to access sub from the decoded access token gives off an warning "Property 'sub' does not exist on type 'unknown'." although the values sub does exist. This issues does not cause any runtime or compiletime errors.*/

    const userId = JTWDecodeService.decodeToken<DecodedJWTUserData>(accessToken).sub;

    try {
      const response = await httpServiceInstance.post<ApiResponse<ContactUsResponse>, ApiErrorResponse>(
        `users/${userId}/messages`,
        formInput,
      );
      if (!response) {
        throw new APIError('UNKNOWN_ERROR');
      }
      return response;
    } catch (error) {
      return error;
    }
  }

  //NOTE:: Consider moving this service method to a seperate class if fetching user data is done more than once.
  static async getUserData(accessToken: string) {
    const httpServiceInstance = HttpServiceInstance.getHttpServiceInstance();
    /*NOTE:: trying to access sub from the decoded access token gives off an warning "Property 'sub' does not exist on type 'unknown'." although the values sub does exist. This issues does not cause any runtime or compiletime errors.*/
    const userId = JTWDecodeService.decodeToken<DecodedJWTUserData>(accessToken).sub;

    try {
      const response = await httpServiceInstance.get<ApiResponse<User>, ApiErrorResponse>(`users/${userId}`);
      return response;
    } catch (error) {
      return error;
    }
  }
}
