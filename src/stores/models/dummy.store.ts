import { createModel } from '@rematch/core';

import { RootModel } from './';

// This is a dummy store to check the redux implementation
// TODO::remove this once other stores get implemented
export interface DummyStoreState {
  value: number;
}

const initialState: DummyStoreState = {
  value: 0,
};

export const dummyStore = createModel<RootModel>()({
  state: { ...initialState } as DummyStoreState,
  reducers: {
    increment(state: DummyStoreState, payload: number) {
      return { ...state, value: state.value + payload };
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  effects: dispatch => ({}),
});
