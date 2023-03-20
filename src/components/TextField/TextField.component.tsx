import React, { forwardRef, useMemo } from 'react';
import { TextInput as RNTextInput, View } from 'react-native';
import { TextInput } from 'react-native-paper';

import { tw } from '@sz/config';
import { Color, TextVariant } from '@sz/constants';

import { Text } from '../Typography';
import { TextInputProps } from './TextField.types';

export const TextField = forwardRef<RNTextInput, TextInputProps>(function AppTextField(
  {
    backgroundColor = Color.Primary.Sz500, //Figma uses a different color which not defined in the design system
    defaultValue,
    value,
    disabled = false,
    label,
    helperText,
    helperTextColor = Color.Neutral.Sz200,
    leftIcon,
    labelColor = Color.Neutral.Sz200,
    onChangeText,
    onBlur,
    onFocus,
    rightIcon = null,
    secureTextEntry,
    testID,
    textColor = Color.Secondary.Sz200,
    blurOnSubmit,
    onSubmitEditing,
    onEndEditing,
    maxLength,
    keyboardType,
    placeholder,
    autoCapitalize,
    textContentType,
    autoComplete,
    onRightIconPress,
    autoCorrect,
    multiline,
    numberOfLines,
  }: TextInputProps,
  ref,
) {
  const labelText = useMemo(
    () => (
      <Text variant={TextVariant.Body2SemiBold} color={labelColor}>
        {label}
      </Text>
    ),
    [labelColor, label],
  );

  const HelperText = useMemo(
    () => (
      <Text variant={TextVariant.Labels} color={helperTextColor}>
        {helperText}
      </Text>
    ),
    [helperText, helperTextColor],
  );

  return (
    <View>
      {labelText}
      <TextInput
        style={tw`h-12.5 p-0 m-0`}
        ref={ref}
        mode="outlined"
        secureTextEntry={secureTextEntry}
        defaultValue={defaultValue}
        textContentType={textContentType}
        disabled={disabled}
        autoComplete={autoComplete}
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
        onFocus={onFocus}
        //TODO::on focus
        placeholder={placeholder}
        theme={{
          colors: {
            primary: Color.Primary.Sz800,
            placeholder: Color.Neutral.Sz500, //Figma does not specify this value. Update accordinly
            text: textColor,
            background: backgroundColor,
            disabled: Color.Neutral.Sz700,
          },
          fonts: {}, //TODO::handle fonts
          roundness: 10,
        }}
        autoCapitalize={autoCapitalize}
        onEndEditing={onEndEditing}
        onSubmitEditing={onSubmitEditing}
        maxLength={maxLength}
        keyboardType={keyboardType}
        blurOnSubmit={blurOnSubmit}
        testID={testID}
        outlineColor={Color.Transparency.full}
        activeOutlineColor={Color.Neutral.Sz500} //Figma does not specify this value. Without this it's hard to identify whether the text being focused or not.
        autoCorrect={autoCorrect}
        multiline={multiline}
        numberOfLines={numberOfLines}
        left={
          //TODO::handle icons colors when disable
          leftIcon && <TextInput.Icon name={() => leftIcon} style={{ marginTop: '50%' }} />
        }
        right={
          rightIcon && <TextInput.Icon name={() => rightIcon} onPress={onRightIconPress} style={{ marginTop: '50%' }} />
        }
      />
      {HelperText}
    </View>
  );
});
