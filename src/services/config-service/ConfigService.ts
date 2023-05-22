import { IS_JEST_RUNTIME } from '@sz/constants';

export type GetConfigCallback<T = unknown> = (key: string) => T;

export class ConfigService {
  private static getConfigCallback: GetConfigCallback;

  public static setCallback(getConfigCallback: GetConfigCallback) {
    ConfigService.getConfigCallback = getConfigCallback;
  }

  public static getConfig<T = string>(key: string): T {
    if (!this.getConfigCallback) {
      throw new Error(
        'getConfigCallback function is not defined! getConfig must be called after setting up a callback function',
      );
    }

    const value = ConfigService.getConfigCallback(key) as T;
    if (value === undefined && !IS_JEST_RUNTIME) {
      throw new Error(`Configuration value for '${key}' is not available`);
    }

    return value;
  }

  /**
   * Reads an optional configuration parameter. If it is not configured, no error will be thrown.
   */
  public static getOptionalConfig<T = string>(key: string): T | undefined {
    return this.getConfigCallback?.(key) as T | undefined;
  }
}
