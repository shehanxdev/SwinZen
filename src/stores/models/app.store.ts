import { createModel } from '@rematch/core';

import { RootModel } from '.';
import { Route } from './../../constants';

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
