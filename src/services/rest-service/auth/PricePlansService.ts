import { ApiErrorResponse, ApiResponse, PricePlansResponse } from '@sz/models';

import { APIError, HttpServiceInstance } from '../../http-service';

export class PricePlansService {
  static async getPricePlans() {
    const httpServiceInstance = HttpServiceInstance.getHttpServiceInstance();

    try {
      const response = await httpServiceInstance.get<ApiResponse<PricePlansResponse>, ApiErrorResponse>('/plans');

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
