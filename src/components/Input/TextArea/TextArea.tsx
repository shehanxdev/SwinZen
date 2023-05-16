import React, { forwardRef } from 'react';
import { TextInput as RNTextInput } from 'react-native';

import { tw } from '@sz/config';

import { TextField } from '../TextField/TextField.component';
import { TextFieldProps } from '../TextField/TextField.types';

type TextAreaProps = Omit<TextFieldProps, 'leftIcon' | 'rightIcon' | 'onRightIconPress' | 'multiline'>;

export const TextArea = forwardRef<RNTextInput, TextAreaProps>(function TextAreainput(
  { innerTextInputStyles = tw`min-h-33 p-4 m-0`, ...rest }: TextAreaProps,
  ref,
) {
  return <TextField ref={ref} multiline={true} innerTextInputStyles={innerTextInputStyles} {...rest} />;
});
