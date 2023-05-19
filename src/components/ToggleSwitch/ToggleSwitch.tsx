import React from 'react';
import SwitchSelector from 'react-native-switch-selector';

import { tw } from '@sz/config';
import { Color } from '@sz/constants';

interface ToggleSwitchProps {
  options: { label: string; value: string }[];
  onChange: (value: string) => void;
}

export function ToggleSwitch({ options, onChange }: ToggleSwitchProps) {
  return (
    <SwitchSelector
      options={options}
      initial={0}
      onPress={value => onChange(value)}
      textColor={Color.Neutral.Sz700}
      selectedColor={Color.Primary.Sz900}
      buttonColor={Color.Tertiary.Sz900}
      borderColor={Color.Transparency.full}
      borderRadius={10}
      hasPadding
      height={45}
      textStyle={tw`leading-6 font-normal font-SourceSansPro text-base text-[${Color.Neutral.Sz700}]`}
      selectedTextStyle={tw`font-semibold font-SourceSansPro text-base text-[${Color.Primary.Sz900}]`}
      valuePadding={-4}
      backgroundColor={Color.Neutral.Black}
    />
  );
}
