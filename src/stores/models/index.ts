import { Models } from '@rematch/core';

import { appStore } from './app.store';
import { persistentUserStore } from './persistent-user.store';
import { pricePlansStore } from './price-plans.store';
import { userStore } from './user.store';

export interface RootModel extends Models<RootModel> {
  appStore: typeof appStore;
  persistentUserStore: typeof persistentUserStore;
  pricePlansStore: typeof pricePlansStore;
  userStore: typeof userStore;
}

export const models: RootModel = { appStore, persistentUserStore, pricePlansStore, userStore };
