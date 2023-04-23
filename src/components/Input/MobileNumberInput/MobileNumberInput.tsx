import React, { forwardRef } from 'react';
import { TextInput as RNTextInput } from 'react-native';

import { PhoneIcon } from '../../Icon';
import { MaskedInput } from '../MaskedInput';
import { TextFieldProps } from './../../TextField';

//TODO::update the mask depending on the requirements, handle leading zero and country once the requirements get finalized
export const MobileNumberField = forwardRef<RNTextInput, Omit<TextFieldProps, 'leftIcon'>>(function MobileNumberInput(
  { ...props },
  ref,
) {
  return <MaskedInput inputMask={'+1 ### ### ####'} ref={ref} leftIcon={<PhoneIcon />} {...props} />;
});
