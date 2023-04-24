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
  | 'returnKeyType'
  | 'returnKeyLabel'
>;

export interface TextFieldProps extends WithRNTextInputProps {
  height?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  textColor?: Color;
  disabledColor?: Color;
  labelColor?: Color;
  helperTextColor?: Color;
  error?: boolean;
  backgroundColor?: Color;
  outlineColor?: Color;
  activeOutlineColor?: Color;
  onRightIconPress?: () => void;
}
