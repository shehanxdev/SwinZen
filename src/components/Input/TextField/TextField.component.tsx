import React, { cloneElement, forwardRef, useMemo } from 'react';
import { TextInput as RNTextInput, View } from 'react-native';
import { TextInput } from 'react-native-paper';

import { tw } from '@sz/config';
import { Color, TextAlignment, TextVariant } from '@sz/constants';

import { Text } from '../../Typography';
import { TextFieldProps } from './TextField.types';

//TODO::handle scroll on focus
export const TextField = forwardRef<RNTextInput, TextFieldProps>(function AppTextField(
  {
    innerTextInputStyles = tw`h-8 px-0 py-2 m-0`, // NOTE: There is a known bug with react native paper text input's ellipsis effect. Adding vertical padding is required to get rid of this issue.
    backgroundColor = Color.Primary.Sz700,
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
    textColor = Color.Neutral.Sz300,
    disabledColor = Color.Neutral.Sz700,
    blurOnSubmit,
    onSubmitEditing,
    activeOutlineColor = Color.Neutral.Sz600,
    outlineColor = Color.Transparency.full,
    onEndEditing,
    maxLength,
    keyboardType,
    error,
    placeholder,
    autoCapitalize,
    textContentType,
    autoComplete,
    onRightIconPress,
    autoCorrect,
    multiline,
    numberOfLines,
    returnKeyType,
    returnKeyLabel,
  }: TextFieldProps,
  ref,
) {
  const labelComponent = useMemo(
    () => (
      <>
        {typeof label === 'string' ? (
          <Text variant={TextVariant.Body2SemiBold} color={labelColor} textAlign={TextAlignment.Auto}>
            {label}
          </Text>
        ) : (
          <>{label}</>
        )}
      </>
    ),
    [labelColor, label, error],
  );

  const helperTextComponent = useMemo(
    () => (
      <Text
        variant={TextVariant.Labels}
        color={error ? Color.Error.SzMain : helperTextColor}
        textAlign={TextAlignment.Auto}>
        {helperText}
      </Text>
    ),
    [helperText, helperTextColor, error],
  );

  /* Design system updates the color of the left icon when the text input gets disabled. So rather than handling the color change within the place TextField being used,
   * create a new React element using original element using React.cloneElement using below two functions.
   */
  const leftIconComponent = useMemo(() => {
    return (
      leftIcon &&
      cloneElement(leftIcon as any, {
        ...(disabled && { color: disabledColor }),
      })
    );
  }, [leftIcon, disabled]);

  const rightIconComponent = useMemo(() => {
    return (
      rightIcon &&
      cloneElement(rightIcon as any, {
        ...(disabled && { color: disabledColor }),
      })
    );
  }, [rightIcon, disabled]);

  return (
    <View>
      {labelComponent}
      <TextInput
        style={innerTextInputStyles}
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
        placeholder={placeholder}
        theme={{
          colors: {
            primary: Color.Primary.Sz800,
            placeholder: Color.Neutral.Sz500, //Figma does not specify this value. Update accordinly
            text: disabled ? Color.Neutral.Sz700 : textColor,
            background: backgroundColor,
            disabled: Color.Neutral.Sz700,
          },
          roundness: 10,
          fonts: {
            regular: tw`text-[16px] font-normal p-0 leading-[18px]`,
          },
        }}
        autoCapitalize={autoCapitalize}
        onEndEditing={onEndEditing}
        onSubmitEditing={onSubmitEditing}
        maxLength={maxLength}
        keyboardType={keyboardType}
        blurOnSubmit={blurOnSubmit}
        testID={testID}
        outlineColor={error ? Color.Error.SzMain : outlineColor}
        activeOutlineColor={error ? Color.Error.SzMain : activeOutlineColor}
        autoCorrect={autoCorrect}
        multiline={multiline}
        numberOfLines={numberOfLines}
        left={leftIcon && <TextInput.Icon name={() => leftIconComponent} style={tw`mt-[50%]`} />}
        right={
          rightIcon && (
            <TextInput.Icon name={() => rightIconComponent} onPress={onRightIconPress} style={tw`mt-[50%]`} />
          )
        }
        returnKeyType={returnKeyType}
        returnKeyLabel={returnKeyLabel}
      />
      {helperText && helperTextComponent}
    </View>
  );
});
