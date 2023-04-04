import {
  ApiErrorResponse,
  ApiResponse,
  ErrorResponse,
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
      const response = await httpServiceInstance.postAnonymous<
        ApiResponse<LoginResponse>,
        ApiErrorResponse<ErrorResponse>
      >('/auth/sign-in', data);

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
      const response = await httpServiceInstance.postAnonymous<
        ApiResponse<SignupResponse>,
        ApiErrorResponse<ErrorResponse>
      >('/auth/sign-up', data);

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
        ApiErrorResponse<ErrorResponse>
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
      const response = await httpServiceInstance.postAnonymous<
        ApiResponse<ResendOtpResponse>,
        ApiErrorResponse<ErrorResponse>
      >('/auth/resend-otp', data);

      return response.data;
    } catch (error) {
      console.error('Error response', error, JSON.stringify(error));
      throw new APIError('CLIENT_ERROR');
    }
  }
}
