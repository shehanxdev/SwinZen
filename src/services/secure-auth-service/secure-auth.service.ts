// NOTE: react-native-get-random-values needs to be imported before crypto-js
import CryptoJS from 'crypto-js';
import 'react-native-get-random-values';
import * as Keychain from 'react-native-keychain';

import { ConfigService } from '../config-service';
import { SecureAuthError } from './secure-auth-error';

const TOKENS_KEYCHAIN_KEY = 'auth-tokens';
const SECRET_PASSPHRASE = ConfigService.getConfig('BASE_URL');

interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export class SecureAuthService {
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
   * Encrypts the given tokens using the secret passphrase and stores in the keychain when authenticated user presence
   */
  static async registerForQuickSignInWhenAuthenticatedUserPresence(
    tokens: AuthTokens,
  ): Promise<false | Keychain.Result> {
    const encryptedToken = CryptoJS.AES.encrypt(JSON.stringify(tokens), SECRET_PASSPHRASE).toString();

    const result = await this.setItem<string>(TOKENS_KEYCHAIN_KEY, encryptedToken);

    return result;
  }

  /**
   * Returns decrypts the encrypted tokens when authenticated user presence
   */
  static async quickSignInWhenAuthenticatedUserPresence(): Promise<AuthTokens> {
    const encryptedToken = await this.getItem<string>(TOKENS_KEYCHAIN_KEY);

    if (!encryptedToken) {
      throw new SecureAuthError('UNEXPECTED_ERROR');
    }

    const tokensString = CryptoJS.AES.decrypt(encryptedToken, SECRET_PASSPHRASE).toString(CryptoJS.enc.Utf8);
    const tokens = JSON.parse(tokensString) as AuthTokens;

    return tokens;
  }

  /**
   * Updates the tokens stored in keychain
   */
  static async updateTokens(tokens: AuthTokens) {
    const encryptedToken = CryptoJS.AES.encrypt(JSON.stringify(tokens), SECRET_PASSPHRASE).toString();
    const result = await this.setItem<string>(TOKENS_KEYCHAIN_KEY, encryptedToken);

    if (!result) {
      throw new SecureAuthError('UPDATE_TOKENS_FAILED');
    }

    return result;
  }

  /**
   * Removes pin has and tokens from the keychain
   */
  static async signOut(): Promise<void> {
    await Keychain.resetGenericPassword({ service: TOKENS_KEYCHAIN_KEY });
  }
}
