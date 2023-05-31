import { initializeStore } from '@sz/stores';

initializeStore();

global.__reanimatedWorkletInit = () => {};
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

jest.mock('@react-navigation/native', () => {
  const navigation = jest.requireActual('@react-navigation/native');

  return {
    ...navigation,
    useNavigation: () => ({
      getParent: jest.fn(),
    }),
    useRoute: () => ({}),
  };
});

jest.mock('react-native-fs', () => {
  return {
    mkdir: jest.fn(),
    moveFile: jest.fn(),
    copyFile: jest.fn(),
    pathForBundle: jest.fn(),
    pathForGroup: jest.fn(),
    getFSInfo: jest.fn(),
    getAllExternalFilesDirs: jest.fn(),
    unlink: jest.fn(),
    exists: jest.fn(),
    stopDownload: jest.fn(),
    resumeDownload: jest.fn(),
    isResumable: jest.fn(),
    stopUpload: jest.fn(),
    completeHandlerIOS: jest.fn(),
    readDir: jest.fn(),
    readDirAssets: jest.fn(),
    existsAssets: jest.fn(),
    readdir: jest.fn(),
    setReadable: jest.fn(),
    stat: jest.fn(),
    readFile: jest.fn(),
    read: jest.fn(),
    readFileAssets: jest.fn(),
    hash: jest.fn(),
    copyFileAssets: jest.fn(),
    copyFileAssetsIOS: jest.fn(),
    copyAssetsVideoIOS: jest.fn(),
    writeFile: jest.fn(),
    appendFile: jest.fn(),
    write: jest.fn(),
    downloadFile: jest.fn(),
    uploadFiles: jest.fn(),
    touch: jest.fn(),
    MainBundlePath: jest.fn(),
    CachesDirectoryPath: jest.fn(),
    DocumentDirectoryPath: jest.fn(),
    ExternalDirectoryPath: jest.fn(),
    ExternalStorageDirectoryPath: jest.fn(),
    TemporaryDirectoryPath: jest.fn(),
    LibraryDirectoryPath: jest.fn(),
    PicturesDirectoryPath: jest.fn(),
  };
});
// NOTE: commenting this out because it causes crash on Testflight release

// jest.mock('react-native-reanimated', () => {
//   const Reanimated = require('react-native-reanimated/mock');
//   Reanimated.default.call = () => {};
//   return Reanimated;
// });

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

jest.mock('@react-navigation/elements', () => ({
  useHeaderHeight: jest.fn(() => 50), // Mock the useHeaderHeight hook
}));

jest.mock('@react-native-async-storage/async-storage', () => {
  const asyncStorage = jest.requireActual('@react-native-async-storage/async-storage/jest/async-storage-mock');
  jest.requireActual('./../services/persistent-storage-service');
  return asyncStorage;
});

jest.mock('redux-persist', () => {
  const real = jest.requireActual('redux-persist');
  return {
    ...real,
    persistReducer: jest.fn().mockImplementation((config, reducers) => reducers),
  };
});
jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');

jest.doMock('react-native-background-timer', () => {
  return {
    stopBackgroundTimer: jest.fn(),
    runBackgroundTimer: jest.fn(),
    setInterval: jest.fn(),
    clearInterval: jest.fn(),
  };
});

jest.mock('@react-native-firebase/messaging', () => ({
  messaging: jest.fn(() => ({
    hasPermission: jest.fn(() => Promise.resolve(true)),
    subscribeToTopic: jest.fn(),
    unsubscribeFromTopic: jest.fn(),
    requestPermission: jest.fn(() => Promise.resolve(true)),
    getToken: jest.fn(() => Promise.resolve('myMockToken')),
  })),
}));

jest.mock('react-native-keychain', () => {
  return {
    setGenericPassword: jest.fn(),
    getGenericPassword: jest.fn(),
    resetGenericPassword: jest.fn(),
  };
});
