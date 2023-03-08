import { createModel } from '@rematch/core';

import { Route } from '@sz/constants';

import { RootModel } from '.';

interface AppState {
  currentRoute?: Route;
}

const initialAppState: AppState = {
  currentRoute: Route.AuthStack,
};

export const appStore = createModel<RootModel>()({
  state: { ...initialAppState } as AppState,
  reducers: {
    setCurrentRoute(state: AppState, payload: Route) {
      return { ...state, currentRoute: payload };
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  effects: dispatch => ({}),
});
