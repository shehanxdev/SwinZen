import { createModel } from '@rematch/core';

import {
  ChangePasswordData,
  EmailVerificationData,
  ForgetPasswordData,
  LoginUserData,
  ResendOtpData,
  ResetPasswordData,
  SignupUserData,
  UserData,
} from '@sz/models';
import { AccountService, AuthService, UserService } from '@sz/services';

import { RootModel } from './';

export interface UserState {
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  passwordResetToken: string | null;
  userId: string | null;
  userData: UserData;
  //TODO::fill other user related state here
}

const initialState: UserState = {
  isAuthenticated: false,
  accessToken: null,
  refreshToken: null,
  passwordResetToken: null,
  userId: null,
  userData: null,
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
    setPasswordResetToken(state: UserState, passwordResetToken: string) {
      return { ...state, passwordResetToken };
    },
    clearPasswordResetToken(state: UserState) {
      return { ...state, passwordResetToken: null };
    },
    setUserId(state: UserState, userId: string | null) {
      return { ...state, userId };
    },
    setUserData(state: UserState, userData: UserData | null) {
      return { ...state, userData };
    },
  },
  effects: dispatch => ({
    async loginUserWithCredentials(payload: LoginUserData) {
      const data = await AuthService.loginUserWithCredentials(payload);
      dispatch.userStore.setAccessToken(data.accessToken);
      dispatch.userStore.setRefreshToken(data.refreshToken);
      dispatch.userStore.setUserId(data.userId);
      dispatch.userStore.setIsAuthenticated(true);
    },
    async logoutUser() {
      dispatch.userStore.setAccessToken(null);
      dispatch.userStore.setRefreshToken(null);
      dispatch.userStore.setUserId(null);
      dispatch.userStore.setIsAuthenticated(false);
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
    async patchUserData(payload: UserData) {
      const data = await UserService.patchUserData(payload);
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
  }),
});
