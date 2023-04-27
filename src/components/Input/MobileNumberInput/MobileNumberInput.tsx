import React, { forwardRef } from 'react';
import { TextInput as RNTextInput } from 'react-native';

import { PhoneIcon } from '../../Icon';
import { MaskedInput } from '../MaskedInput';
import { TextFieldProps } from '../TextField';

type MobileNumberFieldProps = Omit<TextFieldProps, 'leftIcon' | 'rightIcon' | 'keyboardType' | 'onRightIconPress'>;

const COUNTRY_CODE = '+1'; //USA as for the current requirements

//NOTE::currently this implemenation to highly coupled with USA baased numbers.
export const MobileNumberField = forwardRef<RNTextInput, MobileNumberFieldProps>(function MobileNumberInput(
  { value, ...props },
  ref,
) {
  return (
    <MaskedInput
      isMobileNumber={true}
      inputMask={`${COUNTRY_CODE} ### ### ####`}
      ref={ref}
      leftIcon={<PhoneIcon />}
      {...props}
      keyboardType="phone-pad"
      value={value ?? COUNTRY_CODE.concat(' ')}
    />
  );
});
