import { SortDataType } from '@sz/constants';
import {
  ApiErrorResponse,
  ApiResponse,
  DecodedJWTUserData,
  PlanQueryData,
  PricePlansResponse,
  Subscription,
  SubscriptionQueryData,
} from '@sz/models';
import { APIError, HttpServiceInstance, JTWDecodeService } from '@sz/services';

export class PricePlansService {
  static async getPricePlans(sort: SortDataType) {
    const httpServiceInstance = HttpServiceInstance.getHttpServiceInstance();

    try {
      const response = await httpServiceInstance.get<ApiResponse<PricePlansResponse>, ApiErrorResponse>('/plans', {
        sortBy: sort,
      });

      if (!response?.data) {
        throw new APIError('UNKNOWN_ERROR');
      }

      return response.data;
    } catch (error) {
      console.error('Error response', error, JSON.stringify(error));
      throw new APIError('CLIENT_ERROR');
    }
  }

  static async getSubscription(data: SubscriptionQueryData, token: string) {
    const httpServiceInstance = HttpServiceInstance.getHttpServiceInstance();

    try {
      const userId = JTWDecodeService.decodeToken<DecodedJWTUserData>(token).sub;
      const response = await httpServiceInstance.get<ApiResponse<Subscription>, ApiErrorResponse>(
        `/users/${userId}/subscriptions`,
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

  static async addSubscription(data: PlanQueryData, token: string) {
    const httpServiceInstance = HttpServiceInstance.getHttpServiceInstance();

    try {
      const userId = JTWDecodeService.decodeToken<DecodedJWTUserData>(token).sub;
      const response = await httpServiceInstance.post<ApiResponse<Subscription>, ApiErrorResponse>(
        `/users/${userId}/subscriptions`,
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
