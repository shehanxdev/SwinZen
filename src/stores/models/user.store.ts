import { createModel } from '@rematch/core';

import { IS_JEST_RUNTIME } from '@sz/constants';
import {
  ChangePasswordData,
  EmailVerificationData,
  ForgetPasswordData,
  LoginUserData,
  Notification,
  ResendOtpData,
  ResetPasswordData,
  SignupUserData,
  UserData,
} from '@sz/models';
import { AccountService, AuthService, NotifcationsService, SecureAuthService, UserService } from '@sz/services';

import { RootModel } from './';

export interface UserState {
  accessToken: string | null;
  refreshToken: string | null;
  passwordResetToken: string | null;
  userData: UserData;
  //TODO::fill other user related state here
}

const initialState: UserState = {
  accessToken: null,
  refreshToken: null,
  passwordResetToken: null,
  userData: null,
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
    setUserData(state: UserState, userData: UserData | null) {
      return { ...state, userData };
    },
  },
  effects: dispatch => ({
    async loginUserWithCredentials(payload: LoginUserData) {
      const { accessToken, refreshToken } = await AuthService.loginUserWithCredentials(payload);
      dispatch.userStore.setAccessToken(accessToken);
      dispatch.userStore.setRefreshToken(refreshToken);
      dispatch.persistentUserStore.setIsAuthenticate(true);

      //TODO::check and fix and remove IS_JEST_RUNTIME conditional check
      if (!IS_JEST_RUNTIME) {
        await SecureAuthService.updateAuthTokens({ accessToken: accessToken, refreshToken: refreshToken });
      }

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
    async getAuthTokensFromSecureStorage() {
      try {
        const tokens = await SecureAuthService.getAuthTokens();

        dispatch.userStore.setAccessToken(tokens.accessToken);
        dispatch.userStore.setRefreshToken(tokens.refreshToken);
      } catch (_) {
        dispatch.userStore.logoutUser();
      }
    },
    async getUserData(accessToken: string) {
      const data = await UserService.getUserData(accessToken);
      const modifiedUserData: UserData = {
        name: data.name,
        email: data.email,
        username: data.username,
        profilePicture: data.profilePicture,
        gender: data.gender,
        city: data.city,
        deviceId: data.deviceId,
        isActive: data.isActive,
        fcmTokens: data.fcmTokens,
      };
      dispatch.userStore.setUserData(modifiedUserData);
    },
    async patchUserData(payload: UserData, state) {
      const { accessToken } = state.userStore;
      const data = await UserService.patchUserData(payload, accessToken);
      const modifiedUserData: UserData = {
        name: data.name,
        email: data.email,
        username: data.username,
        profilePicture: data.profilePicture,
        gender: data.gender,
        city: data.city,
        deviceId: data.deviceId,
        isActive: data.isActive,
        fcmTokens: data.fcmTokens,
      };
      dispatch.userStore.setUserData(modifiedUserData);
    },
    async patchUserNotification(payload: Notification, state) {
      const { accessToken } = state.userStore;
      await NotifcationsService.patchUserNotification(payload, accessToken);
    },
  }),
});
