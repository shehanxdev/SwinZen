import React from 'react';

import { TextVariant } from '@sz/constants';

/*
 * NOTE::current design system contains different font weights for the same category(Subtitle SemiBold -> fontWeight: 600 || Body1 SemiBold -> fontWeight: 700)
 * Also it only uses one font SourceSansPro-Regular.ttf and uses styling configs to modify the font. In the current implementation we won't be using that. We will be using the relevant font
 * https://www.figma.com/file/4hnm1Jjr190fiJco1q6gH6/SWINGZEN---UI-design?node-id=36-5068&t=y0f2x5sUYyuTKrLM-0
 */
const FontWeight = {
  Thin: 100,
  ExtraLight: 200,
  Light: 300,
  Normal: 400,
  Medium: 500,
  SemiBold: 600,
  Bold: 700,
  ExtraBold: 800,
  Black: 900,
};

// NOTE::Do not use font family in here. Use tailwind to configure font family within getAppTextStyles function
export const AppTextStyles: Record<TextVariant, React.CSSProperties> = {
  //Headings
  [TextVariant.Heading1]: {
    fontSize: '60px',
    fontWeight: FontWeight.Bold,
    lineHeight: '72px',
  },
  [TextVariant.Heading2]: {
    fontSize: '48px',
    fontWeight: FontWeight.Bold,
    lineHeight: '64px',
  },
  [TextVariant.Heading3]: {
    fontSize: '40px',
    fontWeight: FontWeight.Normal,
    lineHeight: '48px',
  },

  // SubTitle 1
  [TextVariant.SubTitle1]: {
    fontSize: '28px',
    fontWeight: FontWeight.SemiBold,
    lineHeight: '40px',
  },

  // SubTitle 2
  [TextVariant.SubTitle2SemiBold]: {
    fontSize: '21px',
    fontWeight: FontWeight.SemiBold,
    lineHeight: '28px',
  },
  [TextVariant.SubTitle2Bold]: {
    fontSize: '21px',
    fontWeight: FontWeight.Bold,
    lineHeight: '28px',
  },
  [TextVariant.SubTitle2Italic]: {
    fontSize: '21px',
    fontWeight: FontWeight.Normal,
    lineHeight: '28px',
  },

  // Body 1
  [TextVariant.Body1SemiBold]: {
    fontSize: '18px',
    fontWeight: FontWeight.Bold,
    lineHeight: '28px',
  },
  [TextVariant.Body1Regular]: {
    fontSize: '18px',
    fontWeight: FontWeight.Normal,
    lineHeight: '28px',
  },

  // Body 2
  [TextVariant.Body2SemiBold]: {
    fontSize: '16px',
    fontWeight: FontWeight.SemiBold,
    lineHeight: '24px',
  },
  [TextVariant.Body2Regular]: {
    fontSize: '16px',
    fontWeight: FontWeight.Normal,
    lineHeight: '24px',
  },

  // Labels
  [TextVariant.Labels]: {
    fontSize: '15px',
    fontWeight: FontWeight.SemiBold,
    lineHeight: '24px',
  },
};

export function getAppTextStyles(variant: TextVariant) {
  const variantStyle = AppTextStyles[variant];

  let textStyles = `text-${variantStyle.fontSize}`;

  switch (variant) {
    case TextVariant.SubTitle2SemiBold:
    case TextVariant.Body1SemiBold:
    case TextVariant.Body2SemiBold:
      textStyles += ' font-SourceSansProSemiBold';
      break;
    case TextVariant.SubTitle2Bold:
      textStyles += ' font-SourceSansProBold';
    case TextVariant.SubTitle2Italic:
      textStyles += ' font-SourceSansProItalic';
      break;
    default:
      textStyles += ' font-SourceSansPro';
  }

  return textStyles;
}
