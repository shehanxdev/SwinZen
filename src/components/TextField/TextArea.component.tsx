import React, { forwardRef } from 'react';
import { TextInput as RNTextInput } from 'react-native';

import { TextField } from './TextField.component';
import { TextFieldProps } from './TextField.types';

interface TextAreaProps extends TextFieldProps {}

export const TextArea = forwardRef<RNTextInput, TextAreaProps>(function TextAreainput(
  { height = '132px', multiline = true, ...props },
  ref,
) {
  return <TextField height={height} ref={ref} multiline={multiline} {...props} />;
});
