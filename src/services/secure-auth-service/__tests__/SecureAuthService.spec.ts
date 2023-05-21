import * as Keychain from 'react-native-keychain';

import { AuthTokens, SecureAuthService } from '../SecureAuthService';
import { SecureAuthError } from '../secureAuthError';

describe('SecureAuth Service', () => {
  const TOKENS_KEYCHAIN_KEY = 'auth-tokens';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should update auth tokens in keychain', async () => {
    const tokens: AuthTokens = {
      accessToken: 'new_access_token',
      refreshToken: 'new_refresh_token',
    };

    jest.spyOn(Keychain, 'setGenericPassword').mockResolvedValueOnce(true as any);
    const result = await SecureAuthService.updateAuthTokens(tokens);
    expect(result).toEqual(true);
  });

  it('should throw SecureAuthError when failed to update tokens in keychain', async () => {
    jest.spyOn(Keychain, 'setGenericPassword').mockResolvedValueOnce(false);

    await expect(SecureAuthService.updateAuthTokens({} as AuthTokens)).rejects.toThrowError(
      new SecureAuthError('UPDATE_TOKENS_FAILED'),
    );
  });

  it('should throw SecureAuthError when no tokens found in keychain', async () => {
    jest.spyOn(Keychain, 'getGenericPassword').mockResolvedValueOnce(null);

    await expect(SecureAuthService.getAuthTokens()).rejects.toThrowError(new SecureAuthError('GET_TOKENS_FAILED'));
  });

  it('should clear keychain on signout', async () => {
    await SecureAuthService.clearSecureStorage();
    expect(Keychain.resetGenericPassword).toHaveBeenNthCalledWith(1, {
      service: TOKENS_KEYCHAIN_KEY,
    });
  });
});
