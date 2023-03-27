import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { Controller, SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { View } from 'react-native';

import { AccountLockIcon, Button, PasswordField, Text } from '@sz/components';
import { tw } from '@sz/config';
import { Color, TextVariant } from '@sz/constants';
import { ResetPasswordFormValues } from '@sz/models';
import { resetPasswordValidationSchema } from '@sz/utils';

import { BaseAuthScreen } from '../components/BaseAuthScreen';

export function ResetPasswordScreen() {
  const {
    control,
    handleSubmit,
    setFocus,
    formState: { isSubmitted, errors },
  } = useForm<ResetPasswordFormValues>({ mode: 'onChange', resolver: yupResolver(resetPasswordValidationSchema) });

  const onResetPasswordFormInvalid: SubmitErrorHandler<ResetPasswordFormValues> = () => {
    console.log(errors);
    //TODO:: handle error
  };

  const onResetPasswordFormValid: SubmitHandler<ResetPasswordFormValues> = async formInput => {
    // TODO: API Integration
    try {
      console.log('formInput', formInput);
    } catch (error: any) {
      console.log('error', error);
    }
  };
  return (
    <BaseAuthScreen>
      <View style={tw`flex-1 justify-between`} testID="ResetPasswordScreenTestID">
        <View style={tw`mx-5 flex-1 justify-center content-center`}>
          <View style={tw`items-center`}>
            <View style={tw`mt-3 mb-5`}>
              <Text variant={TextVariant.SubTitle2SemiBold}>Reset password</Text>
            </View>
            <View style={tw`mb-13`}>
              <Text variant={TextVariant.Body2Regular}>
                Your new password must be different from your previously used passwords
              </Text>
            </View>
          </View>
          <Controller
            control={control}
            name="password"
            render={({ field: { value, onChange, onBlur, ref }, fieldState: { error, isTouched } }) => (
              <PasswordField
                ref={ref}
                label="Your New Password"
                leftIcon={<AccountLockIcon />}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                helperText={(isTouched || isSubmitted) && error?.message}
                helperTextColor={Color.Error.SzMain}
                error={(isTouched || isSubmitted) && error !== undefined}
                returnKeyType={'next'}
                onSubmitEditing={() => setFocus('confirmPassword')}
              />
            )}
          />
          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { value, onChange, onBlur, ref }, fieldState: { error, isTouched } }) => (
              <PasswordField
                ref={ref}
                label="Confirm Your New Password"
                leftIcon={<AccountLockIcon />}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                helperText={(isTouched || isSubmitted) && error?.message}
                helperTextColor={Color.Error.SzMain}
                error={(isTouched || isSubmitted) && error !== undefined}
                returnKeyType={'done'}
              />
            )}
          />
        </View>
        <View style={tw`items-center mb-5 mx-5`}>
          <View style={tw`mb-3`}>
            <Button
              onPress={handleSubmit(onResetPasswordFormValid, onResetPasswordFormInvalid)}
              title="Save new password"
            />
          </View>
        </View>
      </View>
    </BaseAuthScreen>
  );
}
