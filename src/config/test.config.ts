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
      setOptions: jest.fn(),
    }),
    useRoute: () => ({}),
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
