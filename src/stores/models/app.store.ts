import { createModel } from '@rematch/core';

import { Route } from '@sz/constants';

import { RootModel } from '.';

interface AppState {
  currentRoute?: Route;
  isAppReady: boolean;
}

const initialAppState: AppState = {
  currentRoute: Route.AuthStack,
  isAppReady: false,
};

export const appStore = createModel<RootModel>()({
  state: { ...initialAppState } as AppState,
  reducers: {
    setCurrentRoute(state: AppState, payload: Route) {
      return { ...state, currentRoute: payload };
    },
    setIsAppReady(state: AppState, payload: boolean) {
      return { ...state, isAppReady: payload };
    },
  },

  effects: dispatch => ({
    async initializeApp(_: void, state) {
      if (state.persistentUserStore.isAuthenticated) {
        await dispatch.userStore.getAuthTokensFromSecureStorage();
      }

      dispatch.appStore.setIsAppReady(true);
    },
  }),
});
