import { createModel } from '@rematch/core';

import {
  ChangePasswordData,
  EmailVerificationData,
  ForgetPasswordData,
  LoginUserData,
  ResendOtpData,
  ResetPasswordData,
  SignupUserData,
} from '@sz/models';
import { AccountService, AuthService } from '@sz/services';

import { RootModel } from './';

export interface UserState {
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  nextActionToken: string | null; //TODO::persist this state
  //TODO::fill other user related state here
}

const initialState: UserState = {
  isAuthenticated: false,
  accessToken: null,
  refreshToken: null,
  nextActionToken: null,
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
    setNextActionToken(state: UserState, nextActionToken: string) {
      return { ...state, nextActionToken };
    },
    clearNextActionToken(state: UserState) {
      return { ...state, nextActionToken: null };
    },
  },
  effects: dispatch => ({
    async loginUserWithCredentials(payload: LoginUserData) {
      const data = await AuthService.loginUserWithCredentials(payload);
      dispatch.userStore.setAccessToken(data.accessToken);
      dispatch.userStore.setRefreshToken(data.refreshToken);
      dispatch.userStore.setIsAuthenticated(true);
    },
    async logoutUser() {
      dispatch.userStore.setAccessToken(null);
      dispatch.userStore.setRefreshToken(null);
      dispatch.userStore.setIsAuthenticated(false);
    },
    async registerUser(payload: SignupUserData) {
      const { nextActionToken } = await AuthService.registerUser(payload);
      dispatch.userStore.setNextActionToken(nextActionToken);
    },
    /*
     * NOTE:These function is being shared between registeration and forget password flows since it's the default BE behaviour
     * api/v1/auth/resend-otp
     */
    async emailVerification(payload: EmailVerificationData, state) {
      const { nextActionToken } = state.userStore;
      await AuthService.emailVerification(payload, { 'x-auth': nextActionToken });
    },
    async resendOtp(payload: ResendOtpData) {
      await AuthService.resendOtp(payload);
    },
    async forgetPassword(payload: ForgetPasswordData) {
      const { nextActionToken } = await AuthService.forgetPassword(payload);
      dispatch.userStore.setNextActionToken(nextActionToken);
    },
    async resetPassword(payload: ResetPasswordData, state) {
      const { nextActionToken } = state.userStore;
      await AuthService.resetPassword(payload, { 'x-auth': nextActionToken });
    },
    async profileChangePassword(payload: ChangePasswordData, state) {
      const { accessToken, refreshToken } = state.userStore;
      const data = await AccountService.profileChangePassword(payload, {
        'x-auth': accessToken,
        authorization: `Bearer ${refreshToken}`,
      });

      dispatch.userStore.setAccessToken(data.accessToken);
      dispatch.userStore.setRefreshToken(data.refreshToken);
    },
  }),
});
