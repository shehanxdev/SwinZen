import React, { forwardRef } from 'react';
import { TextInput as RNTextInput } from 'react-native';

import { TextField } from './TextField.component';
import { TextFieldProps } from './TextField.types';

export const TextArea = forwardRef<RNTextInput, TextFieldProps>(function TextAreainput(props, ref) {
  return <TextField ref={ref} multiline={true} innerTextInputStyle="h-[132px] p-4 m-0" {...props} />;
});
