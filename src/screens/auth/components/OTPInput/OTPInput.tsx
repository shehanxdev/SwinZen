import React, { useMemo } from 'react';
import { View } from 'react-native';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';

import { Text } from '@sz/components';
import { tw } from '@sz/config';
import { TextVariant } from '@sz/constants';

const CELL_COUNT = 6;
const SPACE_BETWEEN_CELLS = 10; //px

export interface OTPInputProps {
  testID?: string;
  value: string;
  onChangeValue: (text: string) => void;
  onSubmitEditing: () => void;

  //This prop is needed to get rid of margin issue smaller screen. TODO::remove this prop and use a HOC to provide the parentContainerWidth
  parentContainerWidth?: number;
}

export function OTPInput({ testID, value, onChangeValue, onSubmitEditing, parentContainerWidth }: OTPInputProps) {
  /*
   * This is an additional logic provided by the react-native-confirmation-code-field library
   * useBlurOnFulfill hook has the logic to blurring <TextInput/> when value all the cells get filled with a value
   * Visit https://github.com/retyui/react-native-confirmation-code-field/blob/HEAD/API.md#usebluronfulfillvalue-string-cellcount-number-reftextinput
   * Remove this logic if not needed
   */
  const codeFieldRef = useBlurOnFulfill({ value: value, cellCount: CELL_COUNT });

  /*
   * This is an additional logic provided by the react-native-confirmation-code-field library
   * useClearByFocusCell hook has the logic clear cells after selecting a middle cell.
   * ex : 1 2 5 6 7 clicking in 5 will make this 1 2 _ _ _
   * Visit https://github.com/retyui/react-native-confirmation-code-field/blob/HEAD/API.md#usebluronfulfillvalue-string-cellcount-number-reftextinput
   * Remove this logic if not needed
   * NOTE :: Removing this will introduce more confusion to the user.
   */
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: value,
    setValue: onChangeValue,
  });

  //TODO::Handle edge case :: screens does not contain this issue
  const cellWidth = useMemo(() => {
    const remainingWdithForCells = parentContainerWidth - SPACE_BETWEEN_CELLS * 5;
    return remainingWdithForCells / 6;
  }, [parentContainerWidth]);

  return (
    <View>
      <CodeField
        ref={codeFieldRef}
        caretHidden={false}
        {...props}
        value={value}
        onChangeText={value => {
          onChangeValue(value);
        }}
        cellCount={CELL_COUNT}
        testID={testID}
        rootStyle={tw`h-18 self-center`}
        keyboardType="number-pad"
        returnKeyType={'done'}
        onSubmitEditing={onSubmitEditing}
        textContentType="oneTimeCode"
        renderCell={({ index, symbol, isFocused }) => (
          <View
            onLayout={getCellOnLayoutHandler(index)}
            key={index}
            style={tw`h-full rounded-2.5 w-[${cellWidth}px] justify-center items-center bg-Primary-Sz700 ${
              isFocused ? `border border-Neutral-Sz100` : 'border-0'
            } ${index !== 0 ? 'ml-2.5' : 'ml-0'}`}>
            <Text variant={TextVariant.SubTitle2SemiBold}>{symbol || (isFocused ? <Cursor /> : null)}</Text>
            {!symbol && <View style={tw`absolute w-7 h-px bg-Neutral-Sz600 bottom-3.5`} />}
          </View>
        )}
      />
    </View>
  );
}
