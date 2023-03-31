import { DefaultTheme, configureFonts } from 'react-native-paper';
import { Fonts } from 'react-native-paper/src/types';

import config from './share.config';

/*
 NOTE:: This is not mandatory since most of the texts including React Native Paper components will be handled by the typograghy component. 
*/
const fontConfig: Fonts = {
  regular: {
    fontFamily: config.fontFamily.SourceSansProRegular,
    fontWeight: 'normal',
  },
  medium: {
    fontFamily: config.fontFamily.SourceSansProMedium,
    fontWeight: 'normal',
  },
  light: {
    fontFamily: config.fontFamily.SourceSansProLight,
    fontWeight: 'normal',
  },
  thin: {
    fontFamily: config.fontFamily.SourceSansProThin,
    fontWeight: 'normal',
  },
};

export const paperTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
  },
  fonts: configureFonts({ android: fontConfig, ios: fontConfig, default: fontConfig }),
};
