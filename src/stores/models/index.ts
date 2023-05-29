import { Models } from '@rematch/core';

import { appStore } from './app.store';
import { persistentUserStore } from './persistent-user.store';
import { userStore } from './user.store';

export interface RootModel extends Models<RootModel> {
  appStore: typeof appStore;
  persistentUserStore: typeof persistentUserStore;
  userStore: typeof userStore;
}

export const models: RootModel = { appStore, persistentUserStore, userStore };
