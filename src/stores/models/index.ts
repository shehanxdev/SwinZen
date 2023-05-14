import { Models } from '@rematch/core';

import { appStore } from './app.store';
import { persistentUserStore } from './persistent-user.store';
import { userStore } from './user.store';

export interface RootModel extends Models<RootModel> {
  appStore: typeof appStore;
  userStore: typeof userStore;
  persistentUserStore: typeof persistentUserStore;
}

export const models: RootModel = { appStore, userStore, persistentUserStore };
