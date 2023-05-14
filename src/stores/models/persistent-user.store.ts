import { createModel } from '@rematch/core';

import { RootModel } from '.';

type LoginState = 'initial' | 'subsequent';

interface PersistentUserState {
  isAuthenticated: boolean;
  loginState: LoginState;
}

const initialPersistentUserState: PersistentUserState = {
  isAuthenticated: false,
  loginState: 'initial',
};

export const persistentUserStore = createModel<RootModel>()({
  state: { ...initialPersistentUserState } as PersistentUserState,
  reducers: {
    setIsAuthenticate(state: PersistentUserState, payload: boolean) {
      return {
        ...state,
        isAuthenticated: payload,
      };
    },
    setLoginState(state: PersistentUserState, payload: LoginState) {
      return {
        ...state,
        loginState: payload,
      };
    },
  },
  effects: () => ({}),
});
