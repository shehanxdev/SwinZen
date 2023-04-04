import { createModel } from '@rematch/core';

import { LoginRequestData, SignupRequestData } from '@sz/models';
import { AuthService } from '@sz/services';

import { RootModel } from './';

export interface UserState {
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  //TODO::fill other user related state here
}

const initialState: UserState = {
  isAuthenticated: false,
  accessToken: null,
  refreshToken: null,
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
  },
  effects: dispatch => ({
    async loginUserWithCredentials(payload: LoginRequestData) {
      const data = await AuthService.loginUserWithCredentials(payload);
      dispatch.userStore.setAccessToken(data.accessToken);
      dispatch.userStore.setRefreshToken(data.refreshToken);
      dispatch.userStore.setIsAuthenticated(true);
    },
    async registerUser(payload: SignupRequestData) {
      await AuthService.registerUser(payload);
      //TODO::save required user data to the store and persistence storage if required
    },
  }),
});
