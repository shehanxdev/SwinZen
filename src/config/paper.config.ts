import { DefaultTheme } from 'react-native-paper';
import { MD3Theme } from 'react-native-paper/src/types';

// Todo: Add colors and fonts and other related configurations when create ui components
export const paperTheme: MD3Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
  },
};
