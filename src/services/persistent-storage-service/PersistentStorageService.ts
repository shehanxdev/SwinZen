import AsyncStorage from '@react-native-async-storage/async-storage';

// PersistentStorageService storage callbacks for Rematch persistentPlugin
// https://rematchjs.org/docs/plugins/persist/
interface Storage {
  getItem<T = string>(key: string, ...args: Array<any>): Promise<T>;
  setItem<T = string>(key: string, value: NonNullable<T>, ...args: Array<any>): Promise<void>;
  removeItem(key: string, ...args: Array<any>): Promise<void>;
}

export abstract class PersistentStorageService {
  private static storage: Storage = {
    getItem: PersistentStorageService.getItem,
    setItem: PersistentStorageService.setItem,
    removeItem: PersistentStorageService.removeItem,
  };

  private static async setItem<T = string>(key: string, value: NonNullable<T>) {
    try {
      const stringifiedValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, stringifiedValue);
    } catch (error) {
      console.error(`Could not save item to persistent storage: [key:${key}]`, error.message);
    }
  }

  private static async getItem<T = string>(key: string) {
    try {
      const value = await AsyncStorage.getItem(key);
      const parsedValue: T = JSON.parse(value);
      return parsedValue;
    } catch (error) {
      console.error(`Could not get item from persistent storage: [key:${key}]`, error.message);
      return null;
    }
  }

  private static async removeItem(key: string) {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error(`Could not remove item from persistent storage: [key:${key}]`, error.message);
    }
  }

  public static getStorage() {
    if (!PersistentStorageService.storage) {
      throw new Error('PersistentStorageService storage callbacks for Rematch persistentPlugin are not set properly');
    }

    return PersistentStorageService.storage;
  }
}
