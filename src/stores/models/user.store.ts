import { createModel } from '@rematch/core';

import { RootModel } from './';

export interface UserState {
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  //TODO::fill other user realted state here
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  effects: dispatch => ({
    async loginUserWithCredentials(/* PAYLOAD */) {
      await new Promise(r => setTimeout(r, 2000)); //TODO:: This is a dummy delay to mock API call.
    },
  }),
});
