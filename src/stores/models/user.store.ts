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
  accessToken: string | null;
  refreshToken: string | null;
  passwordResetToken: string | null;
  //TODO::fill other user related state here
}

const initialState: UserState = {
  accessToken: null,
  refreshToken: null,
  passwordResetToken: null,
};

export const userStore = createModel<RootModel>()({
  state: { ...initialState } as UserState,
  reducers: {
    setAccessToken(state: UserState, accessToken: string | null) {
      return { ...state, accessToken };
    },
    setRefreshToken(state: UserState, refreshToken: string | null) {
      return { ...state, refreshToken };
    },
    setPasswordResetToken(state: UserState, passwordResetToken: string) {
      return { ...state, passwordResetToken };
    },
    clearPasswordResetToken(state: UserState) {
      return { ...state, passwordResetToken: null };
    },
  },
  effects: dispatch => ({
    async loginUserWithCredentials(payload: LoginUserData) {
      const data = await AuthService.loginUserWithCredentials(payload);
      dispatch.userStore.setAccessToken(data.accessToken);
      dispatch.userStore.setRefreshToken(data.refreshToken);

      dispatch.persistentUserStore.setIsAuthenticate(true);
      dispatch.persistentUserStore.setLoginState('subsequent');
    },
    async logoutUser() {
      dispatch.userStore.setAccessToken(null);
      dispatch.userStore.setRefreshToken(null);

      dispatch.persistentUserStore.setIsAuthenticate(false);
    },
    async registerUser(payload: SignupUserData) {
      await AuthService.registerUser(payload);

      dispatch.persistentUserStore.setLoginState('initial');
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
    async resetPassword(payload: ResetPasswordData, state) {
      const { passwordResetToken } = state.userStore;
      await AuthService.resetPassword(payload, { 'x-auth': passwordResetToken });
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
