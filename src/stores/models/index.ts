import { Models } from '@rematch/core';

import { dummyStore } from './dummy.store';

export interface RootModel extends Models<RootModel> {
  dummyStore: typeof dummyStore;
}

export const models: RootModel = { dummyStore };
