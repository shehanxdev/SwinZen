import React, { forwardRef } from 'react';
import { TextInput as RNTextInput } from 'react-native';

import { TextField, TextFieldProps } from '../TextField';

const MASK_PLACEHOLDER = '#';

type WithAppTextInputProps = Omit<TextFieldProps, 'value' | 'defaultValue'>;

export interface MaskedInputProps extends WithAppTextInputProps {
  value?: string;
  inputMask: string;
  isMobileNumber?: boolean; //this prop is use to handle edge cased for the when using as a mobile number
}

function getCleanedValue(value: string, mask: string) {
  if (!value) return '';
  let cleanedValue = value;
  const maskCharSegmentsWithoutPlaceholder = mask.split(MASK_PLACEHOLDER).filter(Boolean);
  for (const maskCharSegment of maskCharSegmentsWithoutPlaceholder) {
    const index = cleanedValue.indexOf(maskCharSegment);
    if (index !== -1) {
      const cleanedValueArr = cleanedValue.split('');
      cleanedValueArr.splice(index, maskCharSegment.length);
      cleanedValue = cleanedValueArr.join('');
    }
  }
  return cleanedValue;
}

function maskInputString(value: string, mask: string) {
  let maskedValue = '';
  let vi = 0;

  const cleanedValue = getCleanedValue(value, mask);

  if (!cleanedValue) return '';

  for (let index = 0; index < mask.length; index++) {
    const maskChar = mask[index];
    if (maskChar === MASK_PLACEHOLDER) {
      if (!cleanedValue[vi]) break;
      maskedValue += cleanedValue[vi];
      vi++;
    } else {
      if (maskChar === cleanedValue[vi]) {
        vi++;
      }
      maskedValue += maskChar;
    }
  }
  return maskedValue;
}

export const MaskedInput = forwardRef<RNTextInput, MaskedInputProps>(function (
  { inputMask, onChangeText, isMobileNumber = false, value, ...props },
  ref,
) {
  const getMaskedValue = (val: string) => maskInputString(val, inputMask);

  return (
    <TextField
      ref={ref}
      {...props}
      value={value}
      onChangeText={changedValue => {
        if (isMobileNumber && changedValue.length === 2) return; //EDGE CASE :: stop erasing the country code for mobile number
        if (!value || (value && !value.startsWith(changedValue))) {
          // If the charactors in value isn't deleted from the end to the begining
          onChangeText(getMaskedValue(changedValue));
        } else {
          // If the charactors in value is deleted from the end to the begining
          onChangeText(changedValue);
        }
      }}
    />
  );
});
