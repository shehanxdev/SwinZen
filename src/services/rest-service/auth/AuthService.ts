import {
  ApiErrorResponse,
  ApiResponse,
  LoginErrorResponse,
  LoginResponse,
  LoginUserData,
  RegisterMailVerificationData,
  RegisterMailVerificationErrorResponse,
  RegisterMailVerificationResponse,
  ResendOtpData,
  ResendOtpErrorResponse,
  ResendOtpResponse,
  SignupErrorResponse,
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
        ApiErrorResponse<LoginErrorResponse>
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
        ApiErrorResponse<SignupErrorResponse>
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
        ApiErrorResponse<RegisterMailVerificationErrorResponse>
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
        ApiErrorResponse<ResendOtpErrorResponse>
      >('/auth/resend-otp', data);

      return response.data;
    } catch (error) {
      console.error('Error response', error, JSON.stringify(error));
      throw new APIError('CLIENT_ERROR');
    }
  }
}
