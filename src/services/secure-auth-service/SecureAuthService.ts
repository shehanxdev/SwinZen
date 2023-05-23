import * as Keychain from 'react-native-keychain';

import { SecureAuthError } from './secureAuthError';

const TOKENS_KEYCHAIN_KEY = 'auth-tokens';
const NEXT_ACTION_TOKEN_KEYCHAIN_KEY = 'next-action-token';

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export abstract class SecureAuthService {
  /**
   * Stores the given value in the keychain
   */
  private static async setItem<T>(key: string, value: T): Promise<false | Keychain.Result> {
    const setItemInternal = async (key: string, value: unknown) => {
      await Keychain.resetGenericPassword({ service: key });
      return Keychain.setGenericPassword(key, JSON.stringify(value), {
        service: key,
      });
    };

    try {
      const result = await setItemInternal(key, value);
      return result;
    } catch (error) {
      console.error('Could not save payload on secure storage with react-native-keychain', error);
      return false;
    }
  }

  /**
   * Retrieves the previously stored value
   */
  private static async getItem<T>(key: string): Promise<false | T> {
    const getItemInternal = (key: string) => {
      return Keychain.getGenericPassword({
        service: key,
      });
    };

    try {
      const result = await getItemInternal(key);

      if (!result) return false;

      return JSON.parse(result.password) as T;
    } catch (error) {
      console.error('Could not get item from secure storage', error);
      return false;
    }
  }

  /**
   * Returns auth tokens(access/refresh) stored in keychain
   */
  public static async getAuthTokens(): Promise<AuthTokens> {
    const token = await SecureAuthService.getItem<string>(TOKENS_KEYCHAIN_KEY);

    if (!token) {
      throw new SecureAuthError('GET_TOKENS_FAILED');
    }

    return JSON.parse(token) as AuthTokens;
  }

  /**
   * Updates auth tokens(access/refresh) stored in keychain
   */
  public static async updateAuthTokens(tokens: AuthTokens) {
    const result = await SecureAuthService.setItem<string>(TOKENS_KEYCHAIN_KEY, JSON.stringify(tokens));

    if (!result) {
      throw new SecureAuthError('UPDATE_TOKENS_FAILED');
    }

    return result;
  }

  /**
   * Updates next action token stored in keychain
   */
  public static async updateNextActionToken(token: string) {
    const result = await SecureAuthService.setItem<string>(NEXT_ACTION_TOKEN_KEYCHAIN_KEY, JSON.stringify(token));

    if (!result) {
      throw new SecureAuthError('UPDATE_NEXT_ACTION_TOKENS_FAILED');
    }

    return result;
  }

  /**
   * Returns next action token stored in keychain
   */
  public static async getNextActionToken(): Promise<string> {
    const token = await SecureAuthService.getItem<string>(NEXT_ACTION_TOKEN_KEYCHAIN_KEY);

    if (!token) {
      throw new SecureAuthError('GET_NEXT_ACTION_TOKENS_FAILED');
    }

    return JSON.parse(token);
  }

  /**
   * Removes tokens from the keychain
   */
  public static async clearSecureStorage(): Promise<void> {
    await Keychain.resetGenericPassword({ service: TOKENS_KEYCHAIN_KEY });
    await Keychain.resetGenericPassword({ service: NEXT_ACTION_TOKEN_KEYCHAIN_KEY });
  }
}
