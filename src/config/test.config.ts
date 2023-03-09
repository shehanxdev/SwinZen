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

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
