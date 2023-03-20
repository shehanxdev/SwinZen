import React, { ComponentProps } from 'react';
import { TextInput } from 'react-native-paper';

import { Color } from '@sz/constants';

type RNTextInputProps = ComponentProps<typeof TextInput>;

type WithRNTextInputProps = Pick<
  RNTextInputProps,
  | 'defaultValue'
  | 'value'
  | 'disabled'
  | 'label'
  | 'placeholder'
  | 'onChangeText'
  | 'onBlur'
  | 'onFocus'
  | 'secureTextEntry'
  | 'maxLength'
  | 'label'
  | 'keyboardType'
  | 'onSubmitEditing'
  | 'onEndEditing'
  | 'blurOnSubmit'
  | 'autoCapitalize'
  | 'textContentType'
  | 'autoComplete'
  | 'testID'
  | 'autoCorrect'
  | 'numberOfLines'
  | 'multiline'
>;

export interface TextFieldProps extends WithRNTextInputProps {
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  textColor?: Color;
  disabledColor?: Color;
  labelColor?: Color;
  helperTextColor?: Color;
  error?: boolean;
  backgroundColor?: Color;
  onRightIconPress?: () => void;
}
