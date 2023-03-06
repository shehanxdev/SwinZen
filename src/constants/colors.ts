/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-redeclare */

//TODO::update accordingly

enum Primary {
  Main = `#302F33`,
  Dark = `#18181A`,
  Medium = `#6B6A70`,
  Light = `#D4D3D6`,
}

enum Secondary {
  Main = `#5D00CB`,
  Dark = `#40008F`,
  Medium = `#8742DB`,
  Light = `#DAC4F5`,
}

enum Tertiary {
  Main = `#FFCB4A`,
  Dark = `#B38F34`,
  Medium = `#FFDB80`,
  Light = `#FFEAB7`,
}

enum Text {
  Primary = `#18181A`,
  Secondary = `#6B6A70`,
  Tertiary = `#A9A8AD`,
  Reversed = `#FFFFFF`,
}

enum Error {
  Main = `#FA4D56`,
  Dark = `#A2191F`,
  Light = `#FFF1F1`,
}

enum Success {
  Main = `#42BE65`,
  Dark = `#24A148`,
  Light = `#DEFBE6`,
}

enum Warning {
  Main = '#E87D1A',
  Dark = `#B66419`,
  Light = `#FFF9C4`,
}

const SwingZenThemePalette = {
  Primary,
  Secondary,
  Tertiary,
  Text,
  Error,
  Success,
  Warning,
};

export type Color = Primary | Secondary | Tertiary | Text | Error | Success | Warning;

export const Color = {
  ...SwingZenThemePalette,
};
