import React, { forwardRef } from 'react';
import { TextInput as RNTextInput } from 'react-native';

import { PhoneIcon } from '../../Icon';
import { MaskedInput } from '../MaskedInput';
import { TextFieldProps } from './../../TextField';

type MobileNumberFieldProps = Omit<TextFieldProps, 'leftIcon' | 'rightIcon' | 'keyboardType' | 'onRightIconPress'>;

//TODO::update the mask depending on the requirements, handle leading zero and country once the requirements get finalized
export const MobileNumberField = forwardRef<RNTextInput, MobileNumberFieldProps>(function MobileNumberInput(
  { ...props },
  ref,
) {
  return (
    <MaskedInput inputMask={'+1 ### ### ####'} ref={ref} leftIcon={<PhoneIcon />} {...props} keyboardType="phone-pad" />
  );
});
