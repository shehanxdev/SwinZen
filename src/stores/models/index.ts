import { Models } from '@rematch/core';

import { appStore } from './app.store';
import { pricePlansStore } from './price-plans.store';
import { userStore } from './user.store';

export interface RootModel extends Models<RootModel> {
  appStore: typeof appStore;
  pricePlansStore: typeof pricePlansStore;
  userStore: typeof userStore;
}

export const models: RootModel = { appStore, pricePlansStore, userStore };
