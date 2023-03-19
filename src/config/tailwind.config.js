import { Color, Spacing } from '@sz/constants';

module.exports = {
  content: [],
  theme: {
    fontFamily: {
      SourceSansPro: ['SourceSansPro-Regular'],
      SourceSansProBlack: ['SourceSansPro-Black'],
      SourceSansProBlackItalic: ['SourceSansPro-BlackItalic'],
      SourceSansProBold: ['SourceSansPro-Bold'],
      SourceSansProBoldItalic: ['SourceSansPro-BoldItalic'],
      SourceSansProExtraLight: ['SourceSansPro-ExtraLight'],
      SourceSansProExtraLightItalic: ['SourceSansPro-ExtraLightItalic'],
      SourceSansProItalic: ['SourceSansPro-Italic'],
      SourceSansProLight: ['SourceSansPro-Light'],
      SourceSansProLightItalic: ['SourceSansPro-LightItalic'],
      SourceSansProSemiBold: ['SourceSansPro-SemiBold'],
      SourceSansProSemiBoldItalic: ['SourceSansPro-SemiBoldItalic'],
    },
    spacing: Spacing,
    extend: {
      colors: Color,
      borderWidth: {
        1: '1px',
      },
    },
  },
  plugins: [],
};
