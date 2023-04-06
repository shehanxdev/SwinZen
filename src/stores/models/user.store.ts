import { createModel } from '@rematch/core';

import {
  EmailVerificationData,
  ForgetPasswordData,
  LoginUserData,
  ResendOtpData,
  ResetPasswordData,
  SignupUserData,
} from '@sz/models';
import { AuthService } from '@sz/services';

import { RootModel } from './';

export interface UserState {
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  passwordResetToken: string | null;
  //TODO::fill other user related state here
}

const initialState: UserState = {
  isAuthenticated: false,
  accessToken: null,
  refreshToken: null,
  passwordResetToken: null,
};

export const userStore = createModel<RootModel>()({
  state: { ...initialState } as UserState,
  reducers: {
    setIsAuthenticated(state: UserState, payload: boolean) {
      return { ...state, isAuthenticated: payload };
    },
    setAccessToken(state: UserState, accessToken: string | null) {
      return { ...state, accessToken };
    },
    setRefreshToken(state: UserState, refreshToken: string | null) {
      return { ...state, refreshToken };
    },
    setPasswordResetToken(state: UserState, passwordResetToken: string | null) {
      return { ...state, passwordResetToken };
    },
  },
  effects: dispatch => ({
    async loginUserWithCredentials(payload: LoginUserData) {
      const data = await AuthService.loginUserWithCredentials(payload);
      dispatch.userStore.setAccessToken(data.accessToken);
      dispatch.userStore.setRefreshToken(data.refreshToken);
      dispatch.userStore.setIsAuthenticated(true);
    },
    async registerUser(payload: SignupUserData) {
      await AuthService.registerUser(payload);
      //TODO::save required user data to the store and persistence storage if required
    },
    /*
     * NOTE:These function is being shared between registeration and forget password flows since it's the default BE behaviour
     * api/v1/auth/resend-otp
     */
    async emailVerification(payload: EmailVerificationData) {
      const data = await AuthService.emailVerification(payload);
      dispatch.userStore.setPasswordResetToken(data?.resetPasswordToken);
    },
    async resendOtp(payload: ResendOtpData) {
      await AuthService.resendOtp(payload);
    },
    async forgetPassword(payload: ForgetPasswordData) {
      await AuthService.forgetPassword(payload);
    },
    async resetPassword(payload: ResetPasswordData) {
      await AuthService.resetPassword(payload);
    },
  }),
});
