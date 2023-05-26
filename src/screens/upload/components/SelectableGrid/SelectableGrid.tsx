import React, { useState } from 'react';
import { Pressable, View } from 'react-native';

import { Text } from '@sz/components';
import { tw } from '@sz/config';
import { Color, TextVariant } from '@sz/constants';

interface SelectableGridProps {
  testID?: string;
  options: { label: string; value: string }[];
  onChange: (value: string) => void;
}

export function SelectableGrid({ options, onChange, testID }: SelectableGridProps) {
  const [selectedCellIndex, setSelectedCellIndex] = useState(0);

  const onPress = (index: number, value: string) => {
    setSelectedCellIndex(index);
    onChange(value);
  };

  return (
    <View style={tw`flex-row flex-wrap justify-between gap-2`} testID={testID}>
      {options.map((option, index) => {
        return (
          <Pressable
            testID="grid-option"
            key={index}
            onPress={() => onPress(index, option.value)}
            style={tw`grow w-27.5 h-9  rounded-2 justify-center  ${
              index === selectedCellIndex
                ? `bg-[${Color.Tertiary.Sz900}] text-[${Color.Primary.Sz900}]`
                : `bg-[${Color.Neutral.Black}] text-[${Color.Neutral.Sz700}]`
            }`}>
            <Text
              variant={TextVariant.Body2SemiBold}
              color={index === selectedCellIndex ? Color.Primary.Sz900 : Color.Neutral.Sz700}>
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
