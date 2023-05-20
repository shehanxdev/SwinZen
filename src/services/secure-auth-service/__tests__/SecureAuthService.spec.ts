import Config from 'react-native-config';
import * as Keychain from 'react-native-keychain';

import { SecureAuthService } from '../SecureAuthService';
import { SecureAuthServiceInstance } from '../SecureAuthServiceInstance';
import { ConfigService } from './../../config-service';

describe('SecureAuth Service', () => {
  const TOKENS_KEYCHAIN_KEY = 'auth-tokens';

  beforeAll(() => {
    ConfigService.setCallback(key => Config[key]);
    const secureAuthService = new SecureAuthService(ConfigService.getConfig('SECRET_PASSPHRASE_FOR_ENCRYPT_TOKENS'));
    SecureAuthServiceInstance.setSecureAuthServiceInstance(secureAuthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  //TODO::add unit tests for rest of the cases

  it('should clear keychain on signout', async () => {
    await SecureAuthServiceInstance.getSecureAuthServiceInstance().signOut();
    expect(Keychain.resetGenericPassword).toHaveBeenNthCalledWith(1, {
      service: TOKENS_KEYCHAIN_KEY,
    });
  });
});
