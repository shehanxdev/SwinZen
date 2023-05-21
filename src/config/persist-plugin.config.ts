import { PersistConfig } from 'redux-persist';

import { PersistentStorageService } from '@sz/services';
import { RootModel } from '@sz/stores';

export const getPersistPluginConfig = (): PersistConfig<RootModel> => ({
  key: 'root',
  storage: PersistentStorageService.getStorage(),
  whitelist: ['persistentUserStore'],
});
