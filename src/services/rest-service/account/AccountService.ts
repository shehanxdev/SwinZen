import jwt_decode from 'jwt-decode';

import {
  ApiErrorResponse,
  ApiResponse,
  ChangePasswordData,
  ChangePasswordRequestData,
  ChangePasswordResponse,
} from '@sz/models';

import { APIError, HttpServiceInstance } from './../../http-service';

export class AccountService {
  static async profileChangePassword(data: ChangePasswordData, headers: {}) {
    const { currentPassword, newPassword } = data;
    const httpServiceInstance = HttpServiceInstance.getHttpServiceInstance();

    const payload: ChangePasswordRequestData = {
      //@ts-ignore
      email: jwt_decode(headers['x-auth'])?.username, //TODO::refactor && add decode service
      previousPassword: currentPassword,
      proposedPassword: newPassword,
    };

    try {
      const response = await httpServiceInstance.postAnonymousWithCustomHeaders<
        ApiResponse<ChangePasswordResponse>,
        ApiErrorResponse
      >('/auth/change-password', { ...headers }, payload);

      return response.data;
    } catch (error) {
      throw new APIError<ApiErrorResponse>('CLIENT_ERROR', error.data);
    }
  }
}
