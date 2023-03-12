import Config from 'react-native-config';

import { IS_JEST_RUNTIME } from '@sz/constants';

/**
 * Helper function to detect when certain env entries are missing
 */
export const getConfig = (key: string) => {
  const val = Config[key];
  if (!val && !IS_JEST_RUNTIME) {
    console.warn(`${key} may not available in .env config. Or might be a issue with the cache.`);
  }
  return val;
};
