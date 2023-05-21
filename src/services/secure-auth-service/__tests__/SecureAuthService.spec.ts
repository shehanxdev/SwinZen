import * as Keychain from 'react-native-keychain';

import { SecureAuthService } from '../SecureAuthService';

describe('SecureAuth Service', () => {
  const TOKENS_KEYCHAIN_KEY = 'auth-tokens';

  afterEach(() => {
    jest.clearAllMocks();
  });

  //TODO::add unit tests for rest of the cases

  it('should clear keychain on signout', async () => {
    await SecureAuthService.clearSecureStorage();
    expect(Keychain.resetGenericPassword).toHaveBeenNthCalledWith(1, {
      service: TOKENS_KEYCHAIN_KEY,
    });
  });
});
