import {
  ApiErrorResponse,
  ApiResponse,
  BaseRequestHeaders,
  EmailVerificationData,
  EmailVerificationResponse,
  ForgetPasswordData,
  ForgetPasswordResponse,
  LoginResponse,
  LoginUserData,
  ResendOtpData,
  ResendOtpResponse,
  ResetPasswordData,
  ResetPasswordRequestData,
  ResetPasswordResponse,
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
      throw new APIError<ApiErrorResponse>('CLIENT_ERROR', error.data);
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
      throw new APIError<ApiErrorResponse>('CLIENT_ERROR', error.data);
    }
  }

  static async emailVerification(payload: EmailVerificationData, headers: Pick<BaseRequestHeaders, 'x-auth'>) {
    const httpServiceInstance = HttpServiceInstance.getHttpServiceInstance();

    try {
      const response = await httpServiceInstance.postAnonymousWithCustomHeaders<
        ApiResponse<EmailVerificationResponse>,
        ApiErrorResponse
      >('/auth/verify-otp', { ...headers }, payload);

      return response.data;
    } catch (error) {
      throw new APIError<ApiErrorResponse>('CLIENT_ERROR', error.data);
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
      throw new APIError<ApiErrorResponse>('CLIENT_ERROR', error.data);
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
      throw new APIError<ApiErrorResponse>('CLIENT_ERROR', error.data);
    }
  }

  static async resetPassword(data: ResetPasswordData, headers: Pick<BaseRequestHeaders, 'x-auth'>) {
    const { email, password } = data;
    const httpServiceInstance = HttpServiceInstance.getHttpServiceInstance();

    const payload: ResetPasswordRequestData = {
      email: email,
      password: password,
    };

    try {
      const response = await httpServiceInstance.postAnonymousWithCustomHeaders<
        ApiResponse<ResetPasswordResponse>,
        ApiErrorResponse
      >('/auth/reset-password', { ...headers }, payload);

      return response.data;
    } catch (error) {
      throw new APIError<ApiErrorResponse>('CLIENT_ERROR', error.data);
    }
  }
}
