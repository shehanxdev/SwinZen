import { FilesType } from '@sz/constants';
import {
  ApiErrorResponse,
  ApiResponse,
  BaseRequestHeaders,
  ChangePasswordData,
  ChangePasswordRequestData,
  ChangePasswordResponse,
  ChangeProfilePictureResponse,
  DecodedJWTUserData,
  PreSignedResponse,
} from '@sz/models';
import { APIError, HttpServiceInstance, JTWDecodeService } from '@sz/services';

export class AccountService {
  static async profileChangePassword(
    data: ChangePasswordData,
    headers: Pick<BaseRequestHeaders, 'x-auth' | 'authorization'>,
  ) {
    const { currentPassword, newPassword } = data;
    const httpServiceInstance = HttpServiceInstance.getHttpServiceInstance();

    const payload: ChangePasswordRequestData = {
      email: JTWDecodeService.decodeToken<DecodedJWTUserData>(headers['x-auth']).username,
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

  static async getPreSignedData(type: FilesType, token: string) {
    const httpServiceInstance = HttpServiceInstance.getHttpServiceInstance();

    try {
      const userId = JTWDecodeService.decodeToken<DecodedJWTUserData>(token).sub;
      const response = await httpServiceInstance.post<ApiResponse<PreSignedResponse>, ApiErrorResponse>(
        `/users/${userId}/pre-signed-urls`,
        { fileType: type },
      );

      if (!response?.data) {
        throw new APIError('UNKNOWN_ERROR');
      }

      return response.data;
    } catch (error) {
      throw new APIError<ApiErrorResponse>('CLIENT_ERROR', error.data);
    }
  }

  static async changeProfilePicture(key: string, token: string) {
    const httpServiceInstance = HttpServiceInstance.getHttpServiceInstance();

    try {
      const userId = JTWDecodeService.decodeToken<DecodedJWTUserData>(token).sub;
      const response = await httpServiceInstance.post<ApiResponse<ChangeProfilePictureResponse>, ApiErrorResponse>(
        `/users/${userId}/profile-image-upload-callback`,
        { filePath: key },
      );

      if (!response?.data) {
        throw new APIError('UNKNOWN_ERROR');
      }

      return response.data;
    } catch (error) {
      throw new APIError<ApiErrorResponse>('CLIENT_ERROR', error.data);
    }
  }
}
