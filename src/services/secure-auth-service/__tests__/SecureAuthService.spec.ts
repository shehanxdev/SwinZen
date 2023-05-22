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

  describe('setItem', () => {
    it('should call Keychain functions with correct arguments', async () => {
      const key = 'testKey';
      const value = { foo: 'bar' };

      jest.spyOn(Keychain, 'setGenericPassword');
      jest.spyOn(Keychain, 'resetGenericPassword');

      // Disabling below eslint rule to test the private function in SecureAuthService
      // eslint-disable-next-line @typescript-eslint/dot-notation
      await SecureAuthService['setItem'](key, value);

      // Verify the Keychain functions are called with correct arguments
      expect(Keychain.resetGenericPassword).toHaveBeenCalledWith({ service: key });
      expect(Keychain.setGenericPassword).toHaveBeenCalledWith(key, JSON.stringify(value), {
        service: key,
      });
    });

    it('should return the result from Keychain.setGenericPassword', async () => {
      const key = 'testKey';
      const value = { foo: 'bar' };
      const expectedResult: Keychain.Result = {
        service: '',
        storage: '',
      };

      // Mock the setGenericPassword function to return the expected result
      jest.spyOn(Keychain, 'setGenericPassword').mockResolvedValueOnce(expectedResult);

      // Disabling below eslint rule to test the private function in SecureAuthService
      // eslint-disable-next-line @typescript-eslint/dot-notation
      const result = await SecureAuthService['setItem'](key, value);
      expect(result).toStrictEqual(expectedResult);
    });

    it('should return false if an error occurs', async () => {
      const key = 'testKey';
      const value = { foo: 'bar' };

      // Mock the setGenericPassword function to throw an error
      jest.spyOn(Keychain, 'setGenericPassword').mockRejectedValueOnce(new Error('Mock error'));

      // Disabling below eslint rule to test the private function in SecureAuthService
      // eslint-disable-next-line @typescript-eslint/dot-notation
      const result = await SecureAuthService['setItem'](key, value);
      expect(result).toBe(false);
    });
  });

  describe('getItem', () => {
    it('should call Keychain.getGenericPassword with the correct arguments', async () => {
      const key = 'testKey';

      jest.spyOn(Keychain, 'getGenericPassword');

      // Disabling below eslint rule to test the private function in SecureAuthService
      // eslint-disable-next-line @typescript-eslint/dot-notation
      await SecureAuthService['getItem'](key);

      // Verify that getGenericPassword is called with the correct arguments
      expect(Keychain.getGenericPassword).toHaveBeenCalledWith({ service: key });
    });

    it('should return the parsed value if Keychain.getGenericPassword returns a result', async () => {
      const key = 'testKey';
      const password = JSON.stringify({ foo: 'bar' });
      const expectedResult = { foo: 'bar' };

      // Mock the getGenericPassword function to return a result
      jest.spyOn(Keychain, 'getGenericPassword').mockResolvedValueOnce({
        username: '',
        password: password,
        service: '',
        storage: '',
      });

      // Disabling below eslint rule to test the private function in SecureAuthService
      // eslint-disable-next-line @typescript-eslint/dot-notation
      const result = await SecureAuthService['getItem'](key);
      expect(result).toStrictEqual(expectedResult);
    });

    it('should return false if Keychain.getGenericPassword does not return a result', async () => {
      const key = 'testKey';

      // Mock the getGenericPassword function to return null
      jest.spyOn(Keychain, 'getGenericPassword').mockResolvedValueOnce(null);

      // Disabling below eslint rule to test the private function in SecureAuthService
      // eslint-disable-next-line @typescript-eslint/dot-notation
      const result = await SecureAuthService['getItem'](key);
      expect(result).toBe(false);
    });

    it('should return false if an error occurs', async () => {
      const key = 'testKey';

      // Mock the getGenericPassword function to throw an error
      jest.spyOn(Keychain, 'getGenericPassword').mockRejectedValueOnce(new Error('Mock error'));

      // Disabling below eslint rule to test the private function in SecureAuthService
      // eslint-disable-next-line @typescript-eslint/dot-notation
      const result = await SecureAuthService['getItem'](key);
      expect(result).toBe(false);
    });
  });
});
