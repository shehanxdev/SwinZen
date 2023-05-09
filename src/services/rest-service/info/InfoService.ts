import { ApiErrorResponse, ApiResponse, FaqResponse } from '@sz/models';

import { APIError, HttpServiceInstance } from '../../http-service';

export class InfoService {
  static async getFAQ() {
    const httpServiceInstance = HttpServiceInstance.getHttpServiceInstance();
    try {
      const response = await httpServiceInstance.getAnonymous<ApiResponse<FaqResponse>, ApiErrorResponse>('/faq');

      if (!response) {
        throw new APIError('UNKNOWN_ERROR');
      }

      return response.data.results;
    } catch (error) {
      console.log('error on InfoService', error);
      throw new APIError<ApiErrorResponse>('CLIENT_ERROR', error);
    }
  }
}
