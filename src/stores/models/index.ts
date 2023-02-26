import { Models } from '@rematch/core';

import { appStore } from './app.store';
import { dummyStore } from './dummy.store';

export interface RootModel extends Models<RootModel> {
  dummyStore: typeof dummyStore;
  appStore: typeof appStore;
}

export const models: RootModel = { dummyStore, appStore };
