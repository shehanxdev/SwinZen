/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-redeclare */

//NOTE:: Since an enum member cannot have a numeric name prefixed with "Sz"
enum Primary {
  Sz900 = `#070707`,
  Sz800 = `#0C1E0F`,
  Sz700 = `#16501D`,
  Sz600 = `#28642A`,
  Sz500 = `#45734A`,
  Sz400 = `#69AA67`,
  Sz300 = `#8DBE8B`,
  Sz200 = `#C0DBBF`,
  Sz100 = `#F0F7F0`, //NOTE::figma contain two different colors(#F0F7F0, #C0DBBF) with the border. #C0DBBF neeeds to be removed since it does not consider within the colors
}

enum Neutral {
  Sz1000 = `#283E36`, //NOTE::not available within the design system colors
  Sz900 = `#212529`,
  Sz800 = `#343A40`,
  Sz700 = `#495057`,
  Sz600 = `#6C757D`,
  Sz500 = `#ADB5BD`,
  Sz400 = `#CED4DA`,
  Sz300 = `#DEE2E6`,
  Sz200 = `#E9ECEF`,
  Sz100 = `#F8F9FA`, //NOTE::figma contain two different colors(#F8F9FA, #DEE2E6) with the border. #DEE2E6 neeeds to be removed since it does not consider within the colors
  Black = `#000000`,
  White = `#FFFFFF`,
}

enum Secondary {
  Sz900 = `#F65815`,
  Sz800 = `#F87944`,
  Sz700 = `#F99469`,
  Sz600 = `#FAA17C`,
  Sz500 = `#FBBCA1`,
  Sz400 = `#FDD7C7`,
  Sz300 = `#FDE4D9`,
  Sz200 = `#FFF2ED`,
  Sz100 = `#FFE3B0`, //NOTE::figma contain two different colors(##FFE3B0, #FFF9F6) with the border. #FFF9F6 neeeds to be removed since it does not consider within the colors
}

/* Currently this is available within the design system as a Secondary value. Since two different colors cannot exist in there, this has to be added to the design system */
enum Tertiary {
  Sz900 = `#A2FD2F`,
  Sz800 = `#B5FD59`,
  Sz700 = `#C4FE7A`,
  Sz600 = `#CBFE8A`,
  Sz500 = `#DAFEAC`,
  Sz400 = `#E9FFCD`,
  Sz300 = `#F0FEDE`,
  Sz200 = `#F8FFEF`,
  Sz100 = `#DAFEAC`, //NOTE::figma contain two different colors(#DAFEAC, #FBFFF7) with the border. #FBFFF7 neeeds to be removed since it does not consider within the colors
}

enum Transparency {
  Sz100 = `#212529`,
  Sz80 = `#212529cc`,
  Sz64 = `#212529a3`,
  Sz56 = `#2125298f`,
  Sz40 = `#21252966`,
  Sz24 = `#2125293d`,
  Sz16 = `#21252929`,
  Sz8 = `#21252914`,
  Sz4 = `#2125290a`,
  full = `#ffffff00`, //NOTE:: This is full transpapernt color. Not available under the design system.
}

enum Error {
  SzMain = `#E35F5F`, //Not defined within the design system but being used within the screens :(
}

const SwingZenThemePalette = {
  Primary,
  Neutral,
  Secondary,
  Tertiary,
  Transparency,
  Error,
};

export type Color = Primary | Neutral | Secondary | Tertiary | Transparency | Error;

export const Color = {
  ...SwingZenThemePalette,
};
