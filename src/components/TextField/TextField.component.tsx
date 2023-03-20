import React, { cloneElement, forwardRef, useMemo } from 'react';
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
    disabledColor = Color.Neutral.Sz700,
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
  const labelTextComponent = useMemo(
    () => (
      <Text variant={TextVariant.Body2SemiBold} color={labelColor}>
        {label}
      </Text>
    ),
    [labelColor, label],
  );

  const helperTextComponent = useMemo(
    () => (
      <Text variant={TextVariant.Labels} color={helperTextColor}>
        {helperText}
      </Text>
    ),
    [helperText, helperTextColor],
  );

  /* Design system updates the color of the left icon when the text input gets disabled. So rather than handling the color change within the place TextField being used,
   * create a new React element using original element using React.cloneElement using below two functions.
   */
  const leftIconComponent = useMemo(() => {
    return cloneElement(leftIcon as any, {
      ...(disabled && { color: disabledColor }),
    });
  }, [leftIcon, disabled]);

  const rightIconComponent = useMemo(() => {
    return cloneElement(leftIcon as any, {
      ...(disabled && { color: disabledColor }),
    });
  }, [rightIcon, disabled]);

  return (
    <View>
      {labelTextComponent}
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
        left={leftIcon && <TextInput.Icon name={() => leftIconComponent} style={{ marginTop: '50%' }} />}
        right={
          rightIcon && (
            <TextInput.Icon name={() => rightIconComponent} onPress={onRightIconPress} style={{ marginTop: '50%' }} />
          )
        }
      />
      {helperTextComponent}
    </View>
  );
});
