import AsyncStorage from '@react-native-async-storage/async-storage';

import { PersistentStorageService, Storage } from '../PersistentStorageService';

type StorageData = {
  key: string;
  value: string;
};
type Callbacks = {
  [key: string]: Storage;
};

describe('PersistentStorage Service', () => {
  const dummyData: StorageData[] = [
    { key: 'key1', value: 'value1' },
    { key: 'key2', value: 'value2' },
    { key: 'key3', value: 'value3' },
    { key: 'key4', value: 'value4' },
    { key: 'key5', value: 'value5' },
  ];
  const storageCallbacks: Callbacks = {
    valid: { getItem: jest.fn(), setItem: jest.fn(), removeItem: jest.fn() },
    invalid: {
      getItem: null,
      setItem: null,
      removeItem: null,
    },
  };
  const thrownErrorDuringInvalidInit =
    'PersistentStorageService storage callbacks for Rematch persistentPlugin are not set properly';

  it('should be able to set items in persistent storage', async () => {
    for (let data of dummyData) {
      await PersistentStorageService.getStorage().setItem(data.key, data.value);
      expect(AsyncStorage.setItem).toHaveBeenCalledWith(data.key, JSON.stringify(data.value));
    }
  });

  it('should be able to get items from persistent storage', async () => {
    for (let data of dummyData) {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(JSON.stringify(data.value));

      const result = await PersistentStorageService.getStorage().getItem(data.key);

      expect(AsyncStorage.getItem).toHaveBeenCalledWith(data.key);
      expect(result).toEqual(data.value);
    }
  });

  it('should be able to remove items from persistent storage', async () => {
    for (let data of dummyData) {
      await PersistentStorageService.getStorage().removeItem(data.key);
      expect(AsyncStorage.removeItem).toHaveBeenCalledWith(data.key);
    }
  });

  it('should log an error if throws an error during SETTING an item to the persistent storage', async () => {
    const error = new Error('AsyncStorage error');
    (AsyncStorage.setItem as jest.Mock).mockRejectedValue(error);

    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    for (let data of dummyData) {
      await PersistentStorageService.getStorage().setItem(data.key, data.value);

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        `Could not save item to persistent storage: [key:${data.key}]`,
        error.message,
      );
    }
  });

  it('should log an error if throws an error during GETTING an item to the persistent storage', async () => {
    const error = new Error('AsyncStorage error');
    (AsyncStorage.getItem as jest.Mock).mockRejectedValue(error);

    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    for (let data of dummyData) {
      await PersistentStorageService.getStorage().getItem(data.key);

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        `Could not get item from persistent storage: [key:${data.key}]`,
        error.message,
      );
    }
  });

  it('should log an error if throws an error during REMOVING an item to the persistent storage', async () => {
    const error = new Error('AsyncStorage error');
    (AsyncStorage.removeItem as jest.Mock).mockRejectedValue(error);

    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    for (let data of dummyData) {
      await PersistentStorageService.getStorage().removeItem(data.key);

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        `Could not remove item from persistent storage: [key:${data.key}]`,
        error.message,
      );
    }
  });

  it('should NOT throw an error if storage callbacks are set properly', () => {
    PersistentStorageService.setStorage(storageCallbacks.valid);

    expect(() => PersistentStorageService.getStorage()).not.toThrow(thrownErrorDuringInvalidInit);
  });

  it('should throw an error if storage callbacks are not set properly', () => {
    PersistentStorageService.setStorage(storageCallbacks.invalid);

    expect(() => PersistentStorageService.getStorage()).toThrow(thrownErrorDuringInvalidInit);
  });
});