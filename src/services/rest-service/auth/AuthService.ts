import {
  ApiErrorResponse,
  ApiResponse,
  ForgetPasswordData,
  ForgetPasswordResponse,
  LoginResponse,
  LoginUserData,
  RegisterMailVerificationData,
  RegisterMailVerificationResponse,
  ResendOtpData,
  ResendOtpResponse,
  SignupResponse,
  SignupUserData,
} from '@sz/models';

import { APIError, HttpServiceInstance } from './../../http-service';

export class AuthService {
  static async loginUserWithCredentials(data: LoginUserData) {
    const httpServiceInstance = HttpServiceInstance.getHttpServiceInstance();

    try {
      const response = await httpServiceInstance.postAnonymous<ApiResponse<LoginResponse>, ApiErrorResponse>(
        '/auth/sign-in',
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

  static async registerUser(data: SignupUserData) {
    const httpServiceInstance = HttpServiceInstance.getHttpServiceInstance();

    try {
      const response = await httpServiceInstance.postAnonymous<ApiResponse<SignupResponse>, ApiErrorResponse>(
        '/auth/sign-up',
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

  static async registerMailVerification(data: RegisterMailVerificationData) {
    const httpServiceInstance = HttpServiceInstance.getHttpServiceInstance();

    try {
      const response = await httpServiceInstance.postAnonymous<
        ApiResponse<RegisterMailVerificationResponse>,
        ApiErrorResponse
      >('/auth/verify-otp', data);

      return response.data;
    } catch (error) {
      console.error('Error response', error, JSON.stringify(error));
      throw new APIError('CLIENT_ERROR');
    }
  }

  static async resendOtp(data: ResendOtpData) {
    const httpServiceInstance = HttpServiceInstance.getHttpServiceInstance();

    try {
      const response = await httpServiceInstance.postAnonymous<ApiResponse<ResendOtpResponse>, ApiErrorResponse>(
        '/auth/resend-otp',
        data,
      );

      return response.data;
    } catch (error) {
      console.error('Error response', error, JSON.stringify(error));
      throw new APIError('CLIENT_ERROR');
    }
  }

  static async forgetPassword(data: ForgetPasswordData) {
    const httpServiceInstance = HttpServiceInstance.getHttpServiceInstance();

    try {
      const response = await httpServiceInstance.postAnonymous<ApiResponse<ForgetPasswordResponse>, ApiErrorResponse>(
        '/auth/forgot-password',
        data,
      );

      return response.data;
    } catch (error) {
      console.error('Error response', error, JSON.stringify(error));
      throw new APIError('CLIENT_ERROR');
    }
  }
}
