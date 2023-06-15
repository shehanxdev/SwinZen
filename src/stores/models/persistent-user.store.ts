import { createModel } from '@rematch/core';

import { RootModel } from '.';

type LoginState = 'initial' | 'subsequent';

interface PersistentUserState {
  isAuthenticated: boolean;
  loginState: LoginState; // this state can be used to identify user's login status('initial login' or 'subsequent login')
  skippedInstructions: boolean; // this state can be used to indentify user want to skip video shoot instructions or not
}

const initialPersistentUserState: PersistentUserState = {
  isAuthenticated: false,
  loginState: 'initial',
  skippedInstructions: false,
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
    setSkippedInstructions(state: PersistentUserState, payload: boolean) {
      return {
        ...state,
        skippedInstructions: payload,
      };
    },
  },
  effects: () => ({}),
});
