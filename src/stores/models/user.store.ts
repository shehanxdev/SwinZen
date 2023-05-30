import { createModel } from '@rematch/core';

import { FilesType, IS_JEST_RUNTIME, OtpType } from '@sz/constants';
import {
  ChangePasswordData,
  EmailVerificationData,
  ForgetPasswordData,
  LoginUserData,
  Notification,
  PlanQueryData,
  PreSignedResponse,
  ResendOtpData,
  ResetPasswordData,
  SignupUserData,
  SubscribedData,
  SubscriptionQueryData,
  UserData,
} from '@sz/models';
import {
  AccountService,
  AuthService,
  NotificationsService,
  PricePlansService,
  SecureAuthService,
  UserService,
} from '@sz/services';
import { mapUserData } from '@sz/utils';

import { RootModel } from './';

export interface UserState {
  accessToken: string | null;
  refreshToken: string | null;
  nextActionToken: string | null;
  userData: UserData | null;
  userPlan: SubscribedData | null;
  preSignedData: PreSignedResponse | null;
  userProfilePic: string | null;
}

const initialState: UserState = {
  accessToken: null,
  refreshToken: null,
  nextActionToken: null,
  userData: null,
  userPlan: null,
  preSignedData: null,
  userProfilePic: null,
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
    setNextActionToken(state: UserState, nextActionToken: string) {
      return { ...state, nextActionToken };
    },
    clearNextActionToken(state: UserState) {
      return { ...state, nextActionToken: null };
    },
    setUserPlan(state: UserState, userPlan: SubscribedData | null) {
      return { ...state, userPlan };
    },
    setUserData(state: UserState, userData: UserData | null) {
      return { ...state, userData };
    },
    setPreSignedData(state: UserState, preSignedData: PreSignedResponse | null) {
      return { ...state, preSignedData };
    },
    setUserProfilePic(state: UserState, userProfilePic: string | null) {
      return { ...state, userProfilePic };
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
    },
    async logoutUser() {
      dispatch.userStore.setAccessToken(null);
      dispatch.userStore.setRefreshToken(null);
      dispatch.persistentUserStore.setIsAuthenticate(false);
      dispatch.userStore.setUserData(null);

      await SecureAuthService.clearSecureStorage();
    },
    async registerUser(payload: SignupUserData) {
      const { nextActionToken } = await AuthService.registerUser(payload);

      //TODO::check and fix and remove IS_JEST_RUNTIME conditional check
      if (!IS_JEST_RUNTIME) {
        await SecureAuthService.updateNextActionToken(nextActionToken);
      }

      dispatch.userStore.setNextActionToken(nextActionToken);
      dispatch.persistentUserStore.setLoginState('initial');
    },
    /*
     * NOTE:These function is being shared between registeration and forget password flows since it's the default BE behaviour
     * api/v1/auth/resend-otp
     *
     * TODO::add proper description regarding the next action token logic for the future reference
     */
    async emailVerification(payload: EmailVerificationData, state) {
      //current next action token
      const { nextActionToken } = state.userStore;

      const emailVerificationData = await AuthService.emailVerification(payload, { 'x-auth': nextActionToken });

      //Wo don't have to store new action token provided by the email verification API in forget password flow in secure storage
      if (payload.otpType === OtpType.FORGOT_PASSWORD)
        //setting up the new action token provided by the email verification API
        dispatch.userStore.setNextActionToken(emailVerificationData.nextActionToken);
    },
    async resendOtp(payload: ResendOtpData, state) {
      //current next action token
      const { nextActionToken } = state.userStore;

      const resentOTPData = await AuthService.resendOtp(payload, { 'x-auth': nextActionToken });

      //setting up the new action token provided by the resend OTP API
      dispatch.userStore.setNextActionToken(resentOTPData.nextActionToken);

      //Wo don't have to store new action token provided by the resend token API in forget password flow in secure storage
      if (payload.otpType === OtpType.VERIFICATION)
        await SecureAuthService.updateNextActionToken(resentOTPData.nextActionToken);
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
    async getAuthTokensFromSecureStorage() {
      try {
        const tokens = await SecureAuthService.getAuthTokens();

        dispatch.userStore.setAccessToken(tokens.accessToken);
        dispatch.userStore.setRefreshToken(tokens.refreshToken);
      } catch (_) {
        await dispatch.userStore.logoutUser();
        await SecureAuthService.clearSecureStorage();
      }
    },
    async getNextActionFromSecureStorage() {
      let nextActionToken = null;
      try {
        const token = await SecureAuthService.getNextActionToken();
        dispatch.userStore.setNextActionToken(token);
        nextActionToken = token;
      } catch (_) {
        dispatch.userStore.setNextActionToken(nextActionToken ?? null);
      }
    },
    async getUserData(_: void, state) {
      const data = await UserService.getUserData(state.userStore.accessToken);

      dispatch.userStore.setUserData(mapUserData(data));
    },
    async patchUserData(payload: UserData, state) {
      const { accessToken } = state.userStore;
      const data = await UserService.patchUserData(payload, accessToken);

      dispatch.userStore.setUserData(mapUserData(data));
    },
    async getSubscription(payload: SubscriptionQueryData, state) {
      const { accessToken } = state.userStore;
      const data = await PricePlansService.getSubscription(payload, accessToken);
      dispatch.userStore.setUserPlan(data.results[0]);
    },
    async addSubscription(payload: PlanQueryData, state) {
      const { accessToken } = state.userStore;
      await PricePlansService.addSubscription(payload, accessToken);
    },
    async patchUserNotification(payload: Notification, state) {
      const { accessToken } = state.userStore;
      await NotificationsService.patchUserNotification(payload, accessToken);
    },
    async getPreSignedData(payload: FilesType, state) {
      const { accessToken } = state.userStore;
      const data = await AccountService.getPreSignedData(payload, accessToken);
      dispatch.userStore.setPreSignedData(data);
    },
    async clearPreSignedData() {
      dispatch.userStore.setPreSignedData(null);
    },
    async changeProfilePicture(payload: string, state) {
      const { accessToken } = state.userStore;
      const data = await AccountService.changeProfilePicture(payload, accessToken);
      dispatch.userStore.setUserProfilePic(data.url);
    },
  }),
});
