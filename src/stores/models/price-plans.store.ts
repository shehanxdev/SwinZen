import { createModel } from '@rematch/core';

import { Plan } from '@sz/models';

import { RootModel } from '.';

interface PricePlansState {
  pricePlans: Array<Plan> | null;
}

const initialPricePlansState: PricePlansState = {
  pricePlans: null,
};

export const pricePlansStore = createModel<RootModel>()({
  state: { ...initialPricePlansState } as PricePlansState,
  reducers: {
    setPricePlans(state: PricePlansState, payload: Array<Plan>) {
      return { ...state, pricePlans: payload };
    },
  },

  effects: dispatch => ({
    async savePricePlans(payload: Array<Plan>) {
      dispatch.pricePlansStore.setPricePlans(payload);
    },
  }),
});
