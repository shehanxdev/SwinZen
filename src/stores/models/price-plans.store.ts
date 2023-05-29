import { createModel } from '@rematch/core';

import { SortDataType } from '@sz/constants';
import { Plan } from '@sz/models';
import { PricePlansService } from '@sz/services';

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
    async getPricePlans(payload: SortDataType) {
      const data = await PricePlansService.getPricePlans(payload);
      dispatch.pricePlansStore.setPricePlans(data.results);
    },
  }),
});
