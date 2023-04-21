import { createModel } from '@rematch/core';

import { Plan } from '@sz/models';
import { PricePlansService } from '@sz/services';

import { RootModel } from '.';

export interface PricePlansState {
  pricePlans: Array<Plan>;
}

const initialState: PricePlansState = {
  pricePlans: [],
};

export const pricePlansStore = createModel<RootModel>()({
  state: { ...initialState } as PricePlansState,
  reducers: {
    setPricePlans(state: PricePlansState, payload: Array<Plan>) {
      return { ...state, pricePlans: payload };
    },
  },
  effects: dispatch => ({
    async getPricePlans() {
      const data = await PricePlansService.getPricePlans();
      dispatch.pricePlansStore.setPricePlans(data.results);
    },
  }),
});
