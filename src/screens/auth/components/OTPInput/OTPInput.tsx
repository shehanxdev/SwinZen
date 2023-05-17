import React, { useMemo, useState } from 'react';
import { Dimensions, View } from 'react-native';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';

import { Text } from '@sz/components';
import { tw } from '@sz/config';
import { TextVariant } from '@sz/constants';

const CELL_COUNT = 6;
//NOTE::below values are in PX
const SPACE_BETWEEN_CELLS = 10;
const DEFAULT_CELL_WIDTH = 51;
const DEFAULT_OTP_INPUT_CONTAINER_WIDTH = DEFAULT_CELL_WIDTH * 6 + SPACE_BETWEEN_CELLS * 5;

export interface OTPInputProps {
  testID?: string;
  value: string;
  onChangeValue: (text: string) => void;
  onSubmitEditing: () => void;
}

export function OTPInput({ testID, value, onChangeValue, onSubmitEditing }: OTPInputProps) {
  const [parentContainerWidth, setParentContainerWidth] = useState(Dimensions.get('window').width);

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

  /*
   * There is an issue with the margin of the edges in OTP cell input component in smaller devices.
   * In order to avoid this we must give an dynamic cell width depending on the window size.
   * NOTE::There is one edge case for this calulation
   * => If the DEFAULT_OTP_INPUT_CONTAINER_WIDTH(6 cell width + 5 margins) less than or equal to parent component width we don't need to reduce the cell width.
   */
  const cellWidth = useMemo(() => {
    if (DEFAULT_OTP_INPUT_CONTAINER_WIDTH <= parentContainerWidth) return DEFAULT_CELL_WIDTH;

    const remainingWidthForCells = parentContainerWidth - SPACE_BETWEEN_CELLS * 5;
    return remainingWidthForCells / 6;
  }, [parentContainerWidth]);

  return (
    <View
      onLayout={event => {
        let { width } = event.nativeEvent.layout;
        setParentContainerWidth(width);
      }}>
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
            } ${index !== 0 ? `ml-[${SPACE_BETWEEN_CELLS}px]` : 'ml-0'}`}>
            <Text variant={TextVariant.SubTitle2SemiBold}>{symbol || (isFocused ? <Cursor /> : null)}</Text>
            {!symbol && <View style={tw`absolute w-7 h-px bg-Neutral-Sz600 bottom-3.5`} />}
          </View>
        )}
      />
    </View>
  );
}
