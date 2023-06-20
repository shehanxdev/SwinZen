import { ApiErrorResponse, ApiResponse, VideoCatData, VideoCatQueryData, VideoCatResponse } from '@sz/models';

import { APIError, HttpServiceInstance } from '../../http-service';

export class VideoService {
  static async getVideoCategories(data: VideoCatQueryData) {
    const httpServiceInstance = HttpServiceInstance.getHttpServiceInstance();

    try {
      const response = await httpServiceInstance.get<ApiResponse<VideoCatResponse>, ApiErrorResponse>(
        '/video-categories',
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
  static async getVideoCategoryData(id: string) {
    const httpServiceInstance = HttpServiceInstance.getHttpServiceInstance();

    try {
      const response = await httpServiceInstance.get<ApiResponse<VideoCatData>, ApiErrorResponse>(
        `/video-categories/${id}`,
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
